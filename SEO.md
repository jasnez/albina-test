# SEO — Albina Sulejmanagić, Advokat

## Implementirano u kodu

- **Meta description** (150–160 znakova) za bolji snippet u rezultatima
- **Open Graph** (og:title, og:description, og:url, og:image, og:site_name) za dijeljenje na društvenim mrežama
- **Twitter Card** (summary_large_image) s naslovom, opisom i slikom
- **Canonical URL** `https://albina-advokat.ba/`
- **Schema.org Attorney** (JSON-LD): ime, telefon, email, adresa, areaServed, knowsAbout
- **Schema.org LegalService** (JSON-LD) za lokalni SEO
- **robots.txt**: dozvoljeno indeksiranje + poveznica na sitemap
- **sitemap.xml**: jedna stranica (glavna), lastmod i priority
- **lang="bs"** na `<html>` (već postojalo)
- **Ključne riječi** proširene (imovinsko pravo, radno pravo, Unsko-sanski kanton)
- **Slika u heroju**: `width` i `height` postavljeni (smanjen CLS)

## Što treba napraviti ručno

1. **Custom domena**  
   U Vercel projektu poveži domenu `albina-advokat.ba` (ili sličnu). Bez toga stranica ostaje na `albina-test.vercel.app` i izgleda manje profesionalno.

2. **Google Search Console**  
   - Dodaj property za `https://albina-advokat.ba` (ili trenutnu domenu).  
   - Pošalji sitemap: `https://albina-advokat.ba/sitemap.xml`.  
   - Provjeri da nema `noindex` / X-Robots-Tag na produkciji (Vercel preview može imati noindex).

3. **Google Business Profile**  
   Otvori profil za advokatsku praksu (ime, adresa, telefon, radno vrijeme, kategorije, fotografije). Za lokalni SEO je vrlo važno.

4. **OG slika**  
   Trenutno se koristi `assets/lady-justice.png`. Za bolji pregled na društvenim mrežama možeš napraviti posebnu sliku 1200×630 px i staviti je npr. u `assets/og-image.jpg`, zatim ažurirati `og:image` i `twitter:image` u `index.html`.

5. **Email na domeni** (opcionalno)  
   Profesionalniji izgled daje email tipa `albina@albina-advokat.ba` umjesto Hotmail adrese. Nakon toga ažuriraj kontakt u HTML-u i u Schema.org JSON-LD.

6. **Zasebne stranice po uslugama** (dugoročno)  
   Stranice tipa `/gradjansko-pravo`, `/krivicno-pravo` s jedinstvenim naslovom, opisom i sadržajem poboljšavaju rangiranje za pojedinačne upite (npr. „advokat krivično pravo Velika Kladuša”).
