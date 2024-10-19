import json
import random
import os



class Crossword:
    def __init__(self, file_path):
        self.file_path = file_path
        self.data = self.load_crossword_data()


    def load_crossword_data(self):
        """Wczytuje dane z pliku JSON."""
        with open(self.file_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def choose_random_hints(self, number_of_hints=8):
        """Losuje 8 haseł z jednowyrazowych i dwu wyrazowych, unikając powtórzeń, zwracając wynik jako JSON."""
        result = []
        selected_words = set()  # Zbiór do śledzenia już wybranych haseł

        # Połącz jednowyrazowe i dwu wyrazowe hasła w jedną listę
        all_words_group = [word for word in self.data['words']]

        if len(all_words_group) < number_of_hints:
            raise ValueError("Niewystarczająca liczba haseł do losowania.")

        # Losowanie haseł, unikając powtórzeń
        while len(result) < number_of_hints:
            haslo_data = random.choice(all_words_group)
            haslo = haslo_data["word"]

            if haslo not in selected_words:
                selected_words.add(haslo)
                podpowiedz = random.choice(haslo_data["hints"])
                result.append({"word": haslo, "hint": podpowiedz})  # Zapisujemy jako JSON (słownik)

        return result