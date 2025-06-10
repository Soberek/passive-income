### Najważniejsze funkcjonalności:

- [x] Generowanie Miernika budżetowego na podstawie wgranego pliku XLSX i eksportowanie do pliku XLSX agregowanych danych
- [x] Generowanie dokumentu IZRZ (Informacja o Zrealizowanych Zadaniach) na podstawie forumlarza i eksportowanie do pliku DOCX
- [x] Dodawanie szkoły do programu według roku szkolnego

  - [ ] Wyświetlanie listy szkół biorących udział w programach
    - [ ] Filtrowanie szkół według roku szkolnego, programu, instytucji

  > Od razu bym chciał wiedzieć kto jest koordynatorem programu w danej szkole, żeby nie trzeba było szukać kontaktów osobno, numer telefonu koordynatora, adres email,

### Funkcjonalności:

- [ ] Dodawanie (szkoły, organizacje)
  - [ ] Usuwanie instytucji
  - [ ] Edytowanie instytucji
- [ ] Dodawanie kontaktów (koordynatorów programów)
  - [ ] Edytowanie kontaktów
  - [ ] Usuwanie kontaktów
- [ ] Dodawanie programów
  - [ ] Edytowanie programów
  - [ ] Usuwanie programów
- [ ] Dodawanie typów działań
- [ ] Dodawanie platform mediów społecznościowych
- [ ] Dodawanie materiałów

##

- Czy inne instytucje mi będą potrzebne tak bardzo prócz nazwy i adresu, okazjonalnie przy prelekcjach, które i tak są rzadko
- Koniec koncow to aplikacja do
- Jeżeli będę mial programy z opisami + szkoły (instytucje) to mogę szybciej tworzyć IZRZ
- Jeżeli bede mial kontakty + programy + instytucje powiązane to mogę wyciągnąć mail-e koordynatorów i szkol jednocześnie
-

### TODO:

- [x] Change date format in generated word document to dd-mm-yyyy
- [x] Zod scheme and validation for all services

### Dictionary:

- [x] Add a table for institutions [instytucje](#instytucje)
  - [x] Fill
- [x] Add a table for contacts
  - [x] Fill
- [x] Add a table for programs
  - [x] Fill
- [x] Add a table for media platforms
  - [x] Fill
- [x] Add a table for action types
  - [x] Fill
- [x] Add a table for materials
  - [ ] Fill
- [x] Add a table for school years
  - [x] Fill

## TODO:

### Backend

- Schools
  - [x] Add a repository
  - [x] Add a service
  - [x] Add a controller
  - [x] Add a router
- Institutions
  - [x] Add a repository
  - [x] Add a service
  - [x] Add a controller
  - [x] Add a router
- Programs
  - [x] Add a repository
  - [x] Add a service
  - [x] Add a controller
  - [x] Add a router
- Action types
  - [x] Add a repository
  - [x] Add a service
  - [x] Add a controller
  - [x] Add a router
        adding action type form not needed
- Media platforms
  - [x] Add a repository
  - [x] Add a service
  - [x] Add a controller
  - [x] Add a router
- Materials
  - [ ] Add a repository
  - [ ] Add a service
  - [ ] Add a controller
  - [ ] Add a router

### Frontend

- Schools
  - [ ] Add school form
  - [ ] Add a table for schools
  - [ ] Add a form for creating a school
- School years
  - [ ] Add a table for school years
- Institutions

### Todo second priority tables

- [x] Add a table for schools (institution_id)
- [ ] Add a table for program coordinators (institution_id, program_id, contact_id, school_year_id)
- [ ] Add a table for institution program participation (institution_id, program_id, school_year_id)
- [ ] Add a table for task materials (task_id, material_id, quantity)
- [ ] Add a table for tasks (task_id, reference_number, task_number, institution_id, program_id, action_type_id, description, date, actions_count, audience_count, media_platform_id)

```json
Przykład wysłanego ządania
{
  "task_number": "45/2025",
  "reference_number": "OZiPZ.966.5.12.2025",   // can be null if not applicable, e.g., in cases of distribution where IZRZ is not created
  "institution_id": 1,
  "program_id": 3,
  "action_type_id": 2, // np. 1=prelekcja, 2=dystrybucja, 3=publikacja
  "description": "Dystrybucja ulotek edukacyjnych",
  "date": "2025-05-19",
  "actions_count": 1,
  "audience_count": 200,
  "media_platform_id": null, // tylko dla publikacji, tutaj null
  "materials": [
    { "material_id": 5, "count": 100 },
    { "material_id": 7, "count": 50 }
  ]
}
```
