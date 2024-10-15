import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine
from .routes import user, auth


models.Base.metadata.create_all(bind=engine)


counter = 300  # 5 minutes in seconds
clients = []  # List to keep track of connected clients


async def countdown():
    global counter
    while True:
        await asyncio.sleep(1)  # Wait for 1 second
        if counter > 0:
            counter -= 1
            
            # Broadcast the current counter value to connected clients
            for client in clients:
                try:
                    await client.send_text(f"Counter: {counter} seconds")
                except WebSocketDisconnect:
                    clients.remove(client)
        else:
            # Reset the counter and notify clients
            for client in clients:
                await client.send_text("Countdown finished! Restarting...")
            counter = 300  # Reset to 300 seconds


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start the countdown task
    task = asyncio.create_task(countdown())
    yield
    # Clean up: Cancel the countdown task if needed
    task.cancel()



app = FastAPI(lifespan=lifespan)

# origins = ["*"]



# app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
# app.include_router(vote.router)



@app.get("/")
def root():
    return {"message": "Hello World"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    global clients
    await websocket.accept()  # Accept the WebSocket connection
    clients.append(websocket)  # Add the new WebSocket client

    # Send the current counter value immediately upon connection
    await websocket.send_text(f"Counter: {counter} seconds")
    
    try:
        while True:
            await asyncio.sleep(1)  # Keep the connection open
    except WebSocketDisconnect:
        clients.remove(websocket)  # Remove client if they disconnect
