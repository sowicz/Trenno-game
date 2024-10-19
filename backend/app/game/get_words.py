import json
import random


class Crossword:
    def __init__(self, file_path):
        self.file_path = file_path
        self.data = self.load_crossword_data()

    def load_crossword_data(self):
        """Wczytuje dane z pliku JSON."""
        with open(self.file_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def choose_random_words(self, number_of_words=8):
        """Losuje określoną liczbę słów, unikając powtórzeń, zwracając wynik jako JSON."""
        result = []
        selected_words = set()  # Zbiór do śledzenia już wybranych haseł

        all_words_group = [word['word'] for word in self.data['words']]

        if len(all_words_group) < number_of_words:
            raise ValueError("Niewystarczająca liczba haseł do losowania.")

        # Losowanie haseł, unikając powtórzeń
        while len(result) < number_of_words:
            word = random.choice(all_words_group)

            if word not in selected_words:
                selected_words.add(word)
                result.append({"word": word})  # Zapisujemy słowo jako JSON (słownik)

        return result
