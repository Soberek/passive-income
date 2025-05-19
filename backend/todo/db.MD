-- This SQL script creates the necessary tables for the database schema of the application.
-- It includes tables for users, roles, permissions, institutions, and schools.
-- The script uses SQLite syntax and includes foreign key constraints for data integrity.

```json
Przykład wysłanego ządania
{
  "task_number": "45/2025",
  "reference_number": "OZiPZ.966.5.12.2025",   // może być null jeśli nie dotyczy w przypadku dystrybucji gdize nie tworzy sie izrz
  "institution_id": 1,
  "program_id": 3,
  "action_type_id": 2, // np. 1=prelekcja, 2=dystrybucja, 3=publikacja
  "description": "Dystrybucja ulotek edukacyjnych",
  "date": "2025-05-19",
  "audience_count": 200,
  "media_platform_id": null, // tylko dla publikacji, tutaj null
  "materials": [
    { "material_id": 5, "count": 100 },
    { "material_id": 7, "count": 50 }
  ]
}
```

## TODO

```sql

CREATE TABLE institutions (
    institution_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    postal_code TEXT,
    municipality TEXT,
    city TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    email TEXT,
    phone TEXT
);

CREATE TABLE schools (
    school_id INTEGER PRIMARY KEY AUTOINCREMENT,
    institution_id INTEGER NOT NULL,
    director TEXT,
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id) ON DELETE CASCADE
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

-- TODO SECOND PRIORITY TABLES
CREATE TABLE institution_program_participation (
    participation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    institution_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    school_year TEXT NOT NULL CHECK (school_year IN ('2023/2024', '2024/2025', '2025/2026')),
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
    FOREIGN KEY (program_id) REFERENCES programs(program_id)
);

CREATE TABLE program_coordinators (
    coordinator_id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id INTEGER NOT NULL,
    institution_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    school_year TEXT NOT NULL CHECK (school_year IN ('2023/2024', '2024/2025', '2025/2026')),
    FOREIGN KEY (program_id) REFERENCES programs(program_id),
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
    FOREIGN KEY (contact_id) REFERENCES contacts(contact_id)
);


CREATE TABLE action_types (
    action_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);


# Materials
CREATE TABLE materials (
    material_id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Renamed from 'id_material'
    name TEXT NOT NULL UNIQUE,
    description TEXT
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
    media_platform_id INTEGER,
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
    FOREIGN KEY (program_id) REFERENCES programs(program_id),
    FOREIGN KEY (action_type_id) REFERENCES action_types(action_type_id),
    FOREIGN KEY (media_platform_id) REFERENCES media_platforms(media_platform_id)
);

-- TODO IN FUTURE
-- It will be used to define levels of education (e.g., primary, secondary, etc.)
CREATE TABLE levels (
    level_id INTEGER PRIMARY KEY AUTOINCREMENT, for consistency
    name TEXT NOT NULL UNIQUE
);

-- THIS TABLE IS FOR FUTURE USE
CREATE TABLE school_levels (
    school_id INTEGER,
    level_id INTEGER,
    FOREIGN KEY (school_id) REFERENCES schools(school_id) ON DELETE CASCADE,
    FOREIGN KEY (level_id) REFERENCES levels(level_id) ON DELETE CASCADE,
    PRIMARY KEY (school_id, level_id)
);

CREATE TABLE materials (
    material_id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Renamed from 'id_material'
    name TEXT NOT NULL UNIQUE,
    description TEXT
);


CREATE TABLE material_distributions (
    distribution_id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Renamed from 'id_distribution'
    material_id INTEGER NOT NULL,  -- Renamed from 'id_material'
    quantity INTEGER NOT NULL,
    distribution_date DATE NOT NULL,
    institution_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    school_year TEXT NOT NULL CHECK (school_year IN ('2023/2024', '2024/2025', '2025/2026', '2026/2027', '2027/2028')),  -- Added 2025/2026
    FOREIGN KEY (material_id) REFERENCES materials(material_id),
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
    FOREIGN KEY (program_id) REFERENCES programs(program_id)
);
```
