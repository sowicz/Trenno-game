import json
from . import game_date
from .game import get_words

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine
from .routes import user, auth, switchwords


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# origins = ["*"]

# app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
# app.include_router(switchwords.router)
# app.include_router(vote.router)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/online")
def root():
    return {f"Active connections: {len(manager.active_connections)}"}




class ConnectionManager:
    def __init__(self):
        # Stores tuples of (WebSocket, client_name)
        self.active_connections: list[tuple[WebSocket, str]] = []

    async def connect(self, websocket: WebSocket, client_name: str):
        await websocket.accept()
        self.active_connections.append((websocket, client_name))

    def disconnect(self, websocket: WebSocket):
        # Find and remove the tuple that contains the WebSocket
        self.active_connections = [
            conn for conn in self.active_connections if conn[0] != websocket
        ]

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        # Iterate over all WebSocket connections and send the message
        for connection, _ in self.active_connections:
            # await connection.send_text(message)
            await connection.send_json(message)

manager = ConnectionManager()


@app.websocket("/ws/{client_name}")
async def websocket_endpoint(websocket: WebSocket, client_name: str):
    # print(f"IP: {websocket.client.host}")

    await manager.connect(websocket, client_name)
    await manager.broadcast({"online":len(manager.active_connections)})
    print(f"New connection! Active connections: {len(manager.active_connections)}")

    # After clients connect
    current_phase, time_remaining = game_date.get_time_until_next_phase()
    await websocket.send_json({"online":len(manager.active_connections)})


    if current_phase == 'game':
    #Losowe slowa z pelnej listy
        words = get_words.Crossword("words.json")
        random_words = words.choose_random_words()
        # print(random_words)
        await websocket.send_json(random_words)
        # await websocket.send_json({"online":len(manager.active_connections)})

    current_phase, time_remaining = game_date.get_time_until_next_phase()
    await websocket.send_json({"phase": str(current_phase), "time_left": time_remaining})


    try:
        while True:
            # current_phase, time_remaining = game_date.get_time_until_next_phase()
            # await websocket.send_json({"phase": str(current_phase), "time_left": time_remaining})

            data = await websocket.receive_text()  # Keep receiving data (if needed)
            if (data == 'new'):
                current_phase, time_remaining = game_date.get_time_until_next_phase()
                await websocket.send_json({"phase": 'game', "time_left": time_remaining})
                await websocket.send_json({"online":len(manager.active_connections)})
                
                if current_phase == 'game':
                    await websocket.send_json({"phase": 'new_game', "time_left": time_remaining})
                #Losowe slowa z pelnej listy
                    # words = get_words.Crossword("words.json")
                    words = get_words.Crossword("words.json")
                    random_words = words.choose_random_words()
                    await websocket.send_json(random_words)
                else:
                    print('-------'+data+'---------')
                    random_hints = []
                    await websocket.send_json(random_hints)
                    # await websocket.send_json({"online":len(manager.active_connections)})
                    print(random_hints)

            # elif (data == 'finish_before_time'):
            #     data = int(data)
            #     print(f'nickname: {client_name} / points {data}')
            #     await manager.broadcast({'nickname': client_name, 'points': data})
            elif (data != 'new'):
                data = int(data)
                print(f'nickname: {client_name} / points {data}')
                await manager.broadcast({'nickname': client_name, 'points': data})



            # CHAT TO ALL CLIENTS
            # await manager.send_personal_message(f"You wrote: {data}", websocket)
            # await manager.broadcast(f"Client #{client_name} says: {data}")

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({"online":len(manager.active_connections)})
        print(f"New connection! Active connections: {len(manager.active_connections)}")