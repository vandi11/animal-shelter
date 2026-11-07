# Animal Shelter REST API – fejlesztői dokumentáció

## 1. Áttekintés

Az API Laravel alapú REST API, amely állatok, felhasználók, profilok és örökbefogadási kérelmek kezelését biztosítja.

Alapértelmezett fejlesztői cím:

    http://localhost:8000/api

Az API JSON formátumot használ. A védett végpontok Sanctum bearer tokennel érhetők el.

## 2. Telepítés és indítás

A projekt gyökerében futtasd:

    cd backend
    composer install
    php artisan migrate
    php artisan db:seed
    php artisan serve

Az alkalmazás alapértelmezett címe:

    http://localhost:8000

Az adatbázis- és alkalmazásbeállítások a helyi .env fájlban találhatók. A .env fájlt ne töltsd fel verziókezelőbe, és a benne lévő titkos értékeket ne oszd meg.

## 3. Hitelesítés

Sikeres bejelentkezés után a válaszban kapott tokent minden védett kérésnél add át:

    Authorization: Bearer <token>
    Accept: application/json

JSON-kéréseknél használd:

    Content-Type: application/json

### Fejlesztői seed felhasználók

| Szerepkör | E-mail | Jelszó |
|---|---|---|
| Admin | admin@example.com | Password!123 |
| Normál felhasználó | test@example.com | Password!123 |

Ezek kizárólag helyi teszteléshez használható adatok.

### Jelszókövetelmények

Regisztrációnál és jelszóváltoztatásnál a jelszó:

- legalább 8 karakteres;
- tartalmaz kisbetűt;
- tartalmaz nagybetűt;
- tartalmaz speciális karaktert;
- megerősített mezővel együtt küldendő.

## 4. Általános válaszok és hibák

Sikeres egyedi lekérés válasza:

    {
        "data": { ... }
    }

A listázó végpontok jelenleg egyszerű data tömböt adnak vissza. A lista válaszokban nincs Laravel pagination links vagy meta blokk.

Gyakori HTTP státuszkódok:

| Kód | Jelentés |
|---|---|
| 200 | Sikeres lekérés vagy módosítás |
| 201 | Sikeres létrehozás |
| 204 | Sikeres törlés, válasz törzs nélkül |
| 401 | Hiányzó vagy érvénytelen token |
| 403 | Nincs megfelelő jogosultság |
| 404 | A kért erőforrás nem található |
| 422 | Hibás bemenet vagy érvénytelen szűrő |

Validációs hiba példa:

    {
        "message": "The given data was invalid.",
        "errors": {
            "adopted": [
                "The selected adopted is invalid."
            ]
        }
    }

## 5. Auth végpontok

### Regisztráció

    POST /register

Példa kérés:

    {
        "name": "Teszt Elek",
        "email": "elek@example.com",
        "password": "Strong!123",
        "password_confirmation": "Strong!123"
    }

### Bejelentkezés

    POST /login

Példa kérés:

    {
        "email": "test@example.com",
        "password": "Password!123"
    }

A válaszban szereplő token értékét használd a védett végpontoknál.

### Kijelentkezés

    POST /logout

Hitelesítés szükséges.

### Aktuális felhasználó

    GET /user

Hitelesítés szükséges.

## 6. Állatok

### Állatok listázása

    GET /pets

Nyilvános végpont. Az eredmény az id mező szerint növekvő sorrendű.

Támogatott szűrők:

    GET /pets?species=dog&gender=male&adopted=false

| Paraméter | Engedélyezett érték |
|---|---|
| species | Az adatbázisban létező faj |
| gender | male, female, unknown |
| adopted | true, false, 1, 0 |

Érvénytelen szűrőérték esetén a válasz 422 Unprocessable Entity. Például az adopted=maybe vagy egy adatbázisban nem létező species=horse hibát eredményez.

### Egy állat lekérése

    GET /pets/{pet}

Példa:

    GET /pets/1

Nyilvános végpont. A paraméternek valóban létező állatazonosítónak kell lennie.

### Állat létrehozása

    POST /pets

Admin jogosultság szükséges.

Példa kérés:

    {
        "species": "dog",
        "name": "Pluto",
        "gender": "male",
        "birth_date": "2022-05-10",
        "weight": 12.5,
        "color": "brown",
        "adopted": false,
        "health_status": "healthy",
        "sterilized": true,
        "arrival_date": "2026-01-15",
        "description": "Friendly and playful dog."
    }

### Állat módosítása

    PUT /pets/{pet}
    PATCH /pets/{pet}

Admin jogosultság szükséges. A PATCH részleges módosításhoz használható.

### Állat törlése

    DELETE /pets/{pet}

Admin jogosultság szükséges.

## 7. Profilok

A profilvégpontok mindig a tokenhez tartozó felhasználó profilját kezelik, ezért nincs szükség profilazonosítóra.

### Saját profil lekérése

    GET /profile

### Profil létrehozása vagy frissítése

    POST /profile
    PUT /profile
    PATCH /profile

Példa kérés:

    {
        "full_name": "Teszt Elek",
        "phone": "+3612345678",
        "address": "Budapest, Test utca 1."
    }

Hitelesítés szükséges. A profil mentése automatikusan a bejelentkezett felhasználó user_id értékéhez kapcsolódik.

## 8. Örökbefogadási kérelmek

### Kérelem létrehozása

    POST /adoption-requests

Normál felhasználói hitelesítés szükséges.

Példa kérés:

    {
        "pet_id": 1
    }

### Saját kérelmek listázása

    GET /my-adoption-requests

A bejelentkezett felhasználó kérelmeit adja vissza, id szerint növekvő sorrendben.

### Összes kérelem listázása

    GET /adoption-requests

Admin jogosultság szükséges. Az admin az összes felhasználó kérelmét lekérheti.

### Egy kérelem lekérése

    GET /adoption-requests/{adoptionRequest}

Admin vagy a kérelem tulajdonosa kérheti le. Az útvonalban kötelező valódi azonosítót megadni, például:

    GET /adoption-requests/1

Ha az Insomnia változója üres, ellenőrizd, hogy az adoption_request_id környezeti változó értéke be van-e állítva. Az API nem kezeli az üres azonosítót automatikusan 1-es értékként.

### Kérelem státuszának módosítása

    PATCH /adoption-requests/{adoptionRequest}

Admin jogosultság szükséges.

Példa kérés:

    {
        "status": "approved"
    }

Engedélyezett státuszok: pending, approved, rejected.

### Kérelem törlése

    DELETE /adoption-requests/{adoptionRequest}

A tulajdonos függőben lévő kérelmet törölhet, admin pedig jogosultság alapján törölhet kérelmet.

## 9. Admin felhasználókezelés

Minden alábbi végponthoz admin jogosultság és bearer token szükséges.

### Felhasználók listázása

    GET /admin/users

A felhasználók id szerint növekvő sorrendben jelennek meg. A válasz nem tartalmaz links vagy meta pagination blokkot.

### Egy felhasználó lekérése

    GET /admin/users/{user}

### Felhasználó módosítása

    PUT /admin/users/{user}
    PATCH /admin/users/{user}

### Felhasználó törlése

    DELETE /admin/users/{user}

## 10. Jogosultsági összefoglaló

| Erőforrás | Vendég | Bejelentkezett user | Admin |
|---|---:|---:|---:|
| Állatok listázása és megtekintése | Igen | Igen | Igen |
| Állat létrehozása, módosítása, törlése | Nem | Nem | Igen |
| Saját profil | Nem | Igen | Igen |
| Örökbefogadási kérelem létrehozása | Nem | Igen | Igen |
| Saját kérelmek | Nem | Igen | Igen |
| Összes kérelem | Nem | Nem | Igen |
| Admin felhasználókezelés | Nem | Nem | Igen |

## 11. Insomnia használata

Az előre elkészített importfájl:

    animal-shelter-insomnia.json

Import után állítsd be a környezeti változókat:

| Változó | Példa |
|---|---|
| base_url | http://localhost:8000/api |
| token | A login válaszából kapott token |
| pet_id | 1 |
| adoption_request_id | 1 |
| user_id | 1 |
| email | test@example.com |
| password | Password!123 |

Ha adatbázis-reset vagy új seedelés miatt megváltoznak az azonosítók, az Insomnia változóit frissíteni kell. Az endpointok és a kérések szerkezete ettől nem változik.

## 12. Gyors tesztelési folyamat

1. Indítsd el a Laravel szervert.
2. Futtasd a POST /login kérést.
3. Másold a választott token értékét az Insomnia token változójába.
4. Ellenőrizd a GET /pets és GET /pets/1 végpontokat.
5. Normál felhasználóval teszteld a profilt és a saját örökbefogadási kérelmeket.
6. Admin tokennel teszteld az állat- és felhasználókezelést, valamint az összes kérelem lekérését.
7. Ellenőrizd a hibás szűrőket is, például GET /pets?adopted=maybe; ennek 422 választ kell adnia.

## 13. Tesztek futtatása

    php artisan test

