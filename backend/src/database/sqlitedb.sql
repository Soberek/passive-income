CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE institutions (
    institution_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
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

CREATE TABLE school_program_participation (
    participation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    school_id INTEGER NOT NULL,
    program_id INTEGER NOT NULL,
    school_year_id INTEGER NOT NULL,
    FOREIGN KEY (school_id) REFERENCES schools(school_id) ON DELETE CASCADE,
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
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
    FOREIGN KEY (program_id) REFERENCES programs(program_id),
    FOREIGN KEY (action_type_id) REFERENCES action_types(action_type_id),
    FOREIGN KEY (media_platform_id) REFERENCES media_platforms(media_platform_id)
);

CREATE TABLE class_types (
    class_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL -- np. "Oddział przedszkolny", "Szkoła podstawowa", "Liceum", "Technikum", "Szkoła branżowa", "Szkoła specja lna", "Przedszkole"
);

CREATE TABLE school_classes (
    school_class_id INTEGER PRIMARY KEY AUTOINCREMENT,
    school_id INTEGER NOT NULL,
    class_type_id INTEGER NOT NULL,
    grade INTEGER, -- numer klasy, np. 1, 2, 3, 4, 5, 6, 7, 8, 1 (LO), 2 (LO) itd., null dla przedszkola
    description TEXT,
    FOREIGN KEY (school_id) REFERENCES schools(school_id) ON DELETE CASCADE,
    FOREIGN KEY (class_type_id) REFERENCES class_types(class_type_id)
);