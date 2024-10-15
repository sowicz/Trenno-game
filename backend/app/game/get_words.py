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




    # OUTPUT -- LIST OF TUPLE 
    # def choose_random_hints(self, number_of_hints=3):

    #   """Losuje 8 haseł: 4 jednowyrazowe i 4 dwuwyrazowe, unikając powtórzeń."""
    #   result = []
    #   selected_words = set()  # Zbiór do śledzenia już wybranych haseł

    #   # Grupy haseł według liczby wyrazów
    #   single_word_group = [word for word in self.data['words'] if len(word["word"].split()) == 1]
    #   two_word_group = [word for word in self.data['words'] if len(word["word"].split()) == 2]

    #   # Losowanie 4 haseł jednowyrazowych
    #   if len(single_word_group) < 4:
    #       raise ValueError("Niewystarczająca liczba jednowyrazowych haseł do losowania.")
      
    #   while len(result) < 4:  # Dopóki nie mamy 4 jednowyrazowych haseł
    #       haslo_data = random.choice(single_word_group)
    #       haslo = haslo_data["word"]

    #       if haslo not in selected_words:
    #           selected_words.add(haslo)
    #           podpowiedz = random.choice(haslo_data["hints"])
    #           result.append((haslo, podpowiedz))

    #   # Losowanie 4 haseł dwu wyrazowych
    #   if len(two_word_group) < 4:
    #       raise ValueError("Niewystarczająca liczba dwuwyrazowych haseł do losowania.")
      
    #   while len(result) < 8:  # Dopóki nie mamy łącznie 8 haseł
    #       haslo_data = random.choice(two_word_group)
    #       haslo = haslo_data["word"]

    #       if haslo not in selected_words:
    #           selected_words.add(haslo)
    #           podpowiedz = random.choice(haslo_data["hints"])
    #           result.append((haslo, podpowiedz))

    #   return result


    # def choose_random_hints(self, number_of_hints=3):
    #     """Losuje 8 haseł: 4 jednowyrazowe i 4 dwuwyrazowe, unikając powtórzeń, zwracając wynik jako JSON."""
    #     result = []
    #     selected_words = set()  # Zbiór do śledzenia już wybranych haseł

    #     # Grupy haseł według liczby wyrazów
    #     single_word_group = [word for word in self.data['words'] if len(word["word"].split()) == 1]
    #     two_word_group = [word for word in self.data['words'] if len(word["word"].split()) == 2]

    #     # Losowanie 4 haseł jednowyrazowych
    #     if len(single_word_group) < 4:
    #         raise ValueError("Niewystarczająca liczba jednowyrazowych haseł do losowania.")
        
    #     while len(result) < 4:  # Dopóki nie mamy 4 jednowyrazowych haseł
    #         haslo_data = random.choice(single_word_group)
    #         haslo = haslo_data["word"]

    #         if haslo not in selected_words:
    #             selected_words.add(haslo)
    #             podpowiedz = random.choice(haslo_data["hints"])
    #             result.append({"word": haslo, "hint": podpowiedz})  # Zapisujemy jako JSON (słownik)

    #     # Losowanie 4 haseł dwu wyrazowych
    #     if len(two_word_group) < 4:
    #         raise ValueError("Niewystarczająca liczba dwuwyrazowych haseł do losowania.")
        
    #     while len(result) < 8:  # Dopóki nie mamy łącznie 8 haseł
    #         haslo_data = random.choice(two_word_group)
    #         haslo = haslo_data["word"]

    #         if haslo not in selected_words:
    #             selected_words.add(haslo)
    #             podpowiedz = random.choice(haslo_data["hints"])
    #             result.append({"word": haslo, "hint": podpowiedz})  # Zapisujemy jako JSON (słownik)

    #     return result


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