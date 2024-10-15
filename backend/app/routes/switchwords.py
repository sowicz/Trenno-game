import json
import os
import random

from fastapi import APIRouter, status, HTTPException
from .. import schemas



SECRET_KEY = os.getenv('SWITCH_ID')

router = APIRouter(tags=['Game'])\


# Ścieżka do plików JSON
words_file = "words.json"
output_file = "words_for_game.json"
number_of_words = 3


# Funkcja losująca 2 hasła i zapisująca do words_for_game.json
def choose_random_words_and_save():
    if not os.path.exists(words_file):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Plik {words_file} nie istnieje!")

    # Wczytanie słów z pliku words.json
    with open(words_file, "r", encoding="utf-8") as f:
        words_data = json.load(f)

    # Losowanie 2 haseł
    random_words = random.sample(words_data['words'], number_of_words)

    # Przygotowanie danych do zapisu
    result = []
    for word_data in random_words:
        word = word_data["word"]
        hint = random.choice(word_data["hints"])  # Wybieramy losową podpowiedź
        result.append({"word": word, "hint": hint})

    # Zapis do pliku words_for_game.json
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=4)

    return result




@router.post("/switchwords", status_code=status.HTTP_201_CREATED)
def create_user(token: schemas.TokenSwitch):
    # Przykład sprawdzenia tokena
    if token.token != SECRET_KEY:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Niepoprawny token")

    # Losowanie i zapis słów
    words = choose_random_words_and_save()

    return {"message": "words for game generated"}
