-- This SQL script creates the necessary tables for the database schema of the application.
-- It includes tables for users, roles, permissions, institutions, and schools.
-- The script uses SQLite syntax and includes foreign key constraints for data integrity.

- Czy inne instytucje mi będą potrzebne tak bardzo prócz nazwy i adresu, okazjonalnie przy prelekcjach, które i tak są rzadko
- Koniec koncow to aplikacja do
- Jeżeli będę mial programy z opisami + szkoły (instytucje) to mogę szybciej tworzyć IZRZ
- Jeżeli bede mial kontakty + programy + instytucje powiązane to mogę wyciągnąć mail-e koordynatorów i szkol jednocześnie

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
  - [ ] Add a form for creating a school
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

## TODO

## Institution

```sql

-- SLOWNIKI


CREATE TABLE institutions (
    institution_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    municipality TEXT NOT NULL,
    city TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    email TEXT,
    phone TEXT
);

CREATE TABLE contacts (
    contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT
);

CREATE TABLE programs (
    program_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    program_type TEXT NOT NULL CHECK (program_type IN ('programowy', 'nieprogramowy'))
);

CREATE TABLE action_types (
    action_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE materials (
    material_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('ulotka', 'plakat', 'broszura', 'zakładka', 'inne')),
    description TEXT
);

CREATE TABLE school_years (
    school_year_id INTEGER PRIMARY KEY AUTOINCREMENT,
    year TEXT NOT NULL UNIQUE CHECK (year IN ('2023/2024', '2024/2025', '2025/2026'))
);


CREATE TABLE schools (
    school_id INTEGER PRIMARY KEY AUTOINCREMENT,
    institution_id INTEGER NOT NULL,
    director TEXT,
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id) ON DELETE CASCADE
);

CREATE TABLE media_platforms (
    media_platform_id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Renamed from 'id_media_platform'
    name TEXT NOT NULL UNIQUE
);
```

```sql
-- TODO SECOND PRIORITY TABLES
CREATE TABLE institution_program_participation (
    participation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    institution_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    school_year_id INTEGER NOT NULL,
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
    FOREIGN KEY (program_id) REFERENCES programs(program_id),
    FOREIGN KEY (school_year_id) REFERENCES school_years(school_year_id)
);

CREATE TABLE program_coordinators (
    coordinator_id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id INTEGER NOT NULL,
    institution_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    school_year_id INTEGER NOT NULL,
    FOREIGN KEY (program_id) REFERENCES programs(program_id),
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
    FOREIGN KEY (contact_id) REFERENCES contacts(contact_id),
    FOREIGN KEY (school_year_id) REFERENCES school_years(school_year_id)
);




CREATE TABLE task_materials (
  task_id INTEGER NOT NULL,
  material_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (task_id, material_id),
  FOREIGN KEY (task_id) REFERENCES tasks(task_id),
  FOREIGN KEY (material_id) REFERENCES materials(material_id)
);

CREATE TABLE tasks (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_number TEXT NOT NULL UNIQUE,
    task_number TEXT UNIQUE,
    institution_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    action_type_id INTEGER NOT NULL,
    description TEXT,
    date DATE,
    actions_count INTEGER,
    audience_count INTEGER,
    media_platform_id INTEGER, -- will be used if the task is a media publication
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
    FOREIGN KEY (program_id) REFERENCES programs(program_id),
    FOREIGN KEY (action_type_id) REFERENCES action_types(action_type_id),
    FOREIGN KEY (media_platform_id) REFERENCES media_platforms(media_platform_id)
);



-- TODO IN FUTURE
-- This table will define levels of education (e.g., primary, secondary, etc.)
-- and will be used to associate schools with their respective education levels in the future.
CREATE TABLE levels (
    -- for consistency
    level_id INTEGER PRIMARY KEY AUTOINCREMENT
    name TEXT NOT NULL UNIQUE
);
CREATE TABLE school_levels (
    school_id INTEGER,
    level_id INTEGER,
    FOREIGN KEY (school_id) REFERENCES schools(school_id) ON DELETE CASCADE,
    FOREIGN KEY (level_id) REFERENCES levels(level_id) ON DELETE CASCADE,
    PRIMARY KEY (school_id, level_id)
);
);
```
