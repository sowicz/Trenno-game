from datetime import datetime

from datetime import datetime

def get_time_until_next_phase():
    """Oblicza czas pozostały do końca gry lub przerwy w sekundach."""
    now = datetime.now()  # Pobiera aktualny czas
    total_cycle_time = 3 * 60  # Jeden cykl gry i przerwy trwa 3 minuty (180 sekund)
    
    # Obliczamy, ile czasu upłynęło od początku dnia w sekundach
    time_since_midnight = (now.hour * 3600) + (now.minute * 60) + now.second
    
    # Obliczamy pozostały czas do zakończenia bieżącego cyklu (czas gry lub przerwy)
    seconds_in_current_cycle = time_since_midnight % total_cycle_time
    
    if seconds_in_current_cycle < 2 * 60:  # Gra trwa przez pierwsze 2 minuty (120 sekund)
        phase = "game"
        time_left = 2 * 60 - seconds_in_current_cycle  # Ile czasu zostało do końca gry
    else:  # Przerwa trwa przez ostatnią minutę (60 sekund)
        phase = "break"
        time_left = 3 * 60 - seconds_in_current_cycle  # Ile czasu zostało do końca przerwy

    return phase, time_left  # Zwracamy liczbę sekund bez opakowywania w timedelta

# Wywołanie funkcji
current_phase, time_remaining_in_seconds = get_time_until_next_phase()
# print(f"Obecna faza: {current_phase}, czas pozostały: {time_remaining_in_seconds} sekund")
