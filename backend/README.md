# Animal Shelter Backend

Laravel alapú REST API állatmenhelyek kezeléséhez. Az API állatokat, felhasználókat, profilokat és örökbefogadási kérelmeket kezel.

## Technológiák

- PHP
- Laravel
- Laravel Sanctum
- SQLite vagy a .env fájlban beállított adatbázis
- Composer

## Követelmények

- PHP 8.2 vagy újabb
- Composer
- SQLite vagy más, Laravel által támogatott adatbázis

## Telepítés

A backend könyvtárban futtasd:

    composer install

Másold le a környezeti konfigurációt, ha még nem létezik:

    copy .env.example .env

Generáld az alkalmazáskulcsot:

    php artisan key:generate

Állítsd be az adatbázis kapcsolódását a .env fájlban, majd futtasd a migrációkat:

    php artisan migrate

Tesztadatok létrehozása:

    php artisan db:seed

Az összes adat újralétrehozása fejlesztői környezetben:

    php artisan migrate:fresh --seed

## Indítás

    php artisan serve

Az API alapértelmezett címe:

    http://localhost:8000/api

## Hitelesítés

Az API Laravel Sanctum bearer token alapú hitelesítést használ.

1. Jelentkezz be a POST /api/login végponton.
2. Másold ki a válaszban kapott tokent.
3. Küldd el a védett végpontoknál az alábbi fejlécben:

    Authorization: Bearer <token>

Fejlesztői seed felhasználók:

| Szerepkör | E-mail | Jelszó |
|---|---|---|
| Admin | admin@example.com | Password!123 |
| Normál felhasználó | test@example.com | Password!123 |

Ezek az adatok kizárólag helyi fejlesztéshez és teszteléshez használhatók.

## API dokumentáció

Az összes végpont, kérésparaméter, jogosultság, válaszformátum, validáció és Insomnia használati információ a következő fájlban található:

[API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## Insomnia

Az API teszteléséhez használható importfájl:

[animal-shelter-insomnia.json](../animal-shelter-insomnia.json)

Importálás után állítsd be legalább az alábbi környezeti változókat:

| Változó | Példa |
|---|---|
| base_url | http://localhost:8000/api |
| token | A login válaszából kapott token |
| pet_id | 1 |
| adoption_request_id | 1 |
| user_id | 1 |

## Jelszószabályok

A felhasználói jelszónak:

- legalább 8 karakterből kell állnia;
- tartalmaznia kell kisbetűt;
- tartalmaznia kell nagybetűt;
- tartalmaznia kell speciális karaktert;
- meg kell egyeznie a megerősítő jelszóval.

## Tesztek futtatása

    php artisan test

## Fontos fejlesztői megjegyzések

- A .env fájlt ne töltsd fel verziókezelőbe.
- A .env fájlban lévő titkos értékeket ne oszd meg.
- A migrate:fresh --seed parancs fejlesztői adatbázisban minden táblát töröl és újra létrehoz.
- Az állatok, örökbefogadási kérelmek és admin felhasználók listázása azonosító szerint növekvő sorrendben történik.
- A lista végpontok nem használnak Laravel pagination links és meta blokkokat.
- Érvénytelen szűrőparaméterek esetén az API 422 Unprocessable Entity választ ad.

## Projektstruktúra

    app/
        Http/Controllers/
        Http/Requests/
        Http/Resources/
        Models/
        Policies/
        Services/
    database/
        factories/
        migrations/
        seeders/
    routes/
        api.php

## Licenc

Ez a projekt oktatási és vizsgaremek céljára készült.
