# EmailApp

## Opis
EmailApp to aplikacja do zarządzania skrzynką pocztową. Pozwala na rejestrację, logowanie, wysyłanie i odbieranie maili, zapisywanie tymczasowych niewysłanych wiadomości oraz przenoszenie ich do kosza.

## Technologie
- React.js (Frontend)
- Spring Boot (Backend)
- H2 Database (Baza danych)
- HTML, CSS (Interfejs użytkownika)


## Funkcjonalności
- Rejestracja użytkownika
- Logowanie do konta
- Tworzenie, wysyłanie i odbieranie wiadomości e-mail
- Zapisywanie niewysłanych wiadomości w trybie tymczasowym
- Przenoszenie wiadomości do kosza

## Instrukcje instalacji

### Backend (Spring Boot)
1. Sklonuj repozytorium: `git clone <link_do_repo>`
2. Przejdź do folderu backend: `cd backend`
3. Uruchom projekt Spring Boot: `./mvnw spring-boot:run`

### Frontend (React.js)
1. Przejdź do folderu frontend: `cd frontend`
2. Zainstaluj zależności: `npm install`
3. Uruchom aplikację: `npm start`

## Struktura katalogów
- **/backend**: Kod źródłowy backendu
- **/frontend**: Kod źródłowy frontendu

## Instrukcje użycia
1. Zarejestruj nowe konto.
2. Zaloguj się.
3. Użyj interfejsu, aby wysyłać, odbierać i zarządzać wiadomościami.
4. Skorzystaj z opcji zapisu niewysłanych i usuwania do kosza.

## API
### Endpointy
1.MailController:
- GET `/api/mails/all` Zwraca listę wszystkich maili.
- GET `/api/mails?id={id}` Zwraca mail o określonym ID.
- POST `/api/mails/sent` Wysyła nowego maila.
- GET `/api/mails/sent?owner={owner}` Zwraca listę wysłanych maili dla określonego właściciela.
- GET `/api/mails/received?owner={owner}` Zwraca listę odebranych maili dla określonego właściciela.
- GET `/api/mails/saved?owner={owner}` Zwraca listę zapisanych maili dla określonego właściciela.
- POST `/api/mails/unsent` Zapisuje niewysłany mail.
- PUT `/api/mails/{mailId}/trashed` Przenosi mail do kosza.
- PUT `/api/mails/{mailId}/restore` Przywraca mail z kosza.
- GET `/api/mails/trashed?owner={owner}` Zwraca listę maili w koszu dla określonego właściciela.
- DELETE `/api/mails/{id}` Usuwa mail o określonym ID.

2.UserController:
- GET `/api/users/all` Zwraca listę wszystkich użytkowników.
- GET `/api/users?email={email}` Zwraca użytkownika o określonym adresie email.
- POST `/api/users` Tworzy nowego użytkownika.
- POST `/api/users/login` Loguje użytkownika.
- PUT `/api/users/{email}` Aktualizuje dane użytkownika o określonym adresie email.
- DELETE `/api/users/{email}` Usuwa użytkownika o określonym adresie email.


## Autorzy
- Klaudiusz Szklarkowski (@klaudek123)
