-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'member' NOT NULL, -- e.g., 'admin', 'member', 'imam'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255),
    image_url VARCHAR(255),
    category VARCHAR(100), -- e.g., 'Lecture', 'Workshop', 'Holiday'
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Prayer Times Table
CREATE TABLE prayer_times (
    id BIGSERIAL PRIMARY KEY,
    location TEXT NOT NULL,
    prayer_date DATE NOT NULL,
    fajr TIME NOT NULL,
    sunrise TIME NOT NULL,
    dhuhr TIME NOT NULL,
    asr TIME NOT NULL,
    maghrib TIME NOT NULL,
    isha TIME NOT NULL,
    source TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_prayer_times UNIQUE (location, prayer_date)
);

-- Imam Questions Table
CREATE TABLE imam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id), -- NULLABLE if anonymous
    question TEXT NOT NULL,
    answer TEXT, -- NULLABLE until answered
    asked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    answered_at TIMESTAMP WITH TIME ZONE, -- NULLABLE
    status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- e.g., 'pending', 'answered', 'archived'
    is_public BOOLEAN DEFAULT FALSE
);

-- Appointments Table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    service_type VARCHAR(255) NOT NULL, -- e.g., 'Marriage Counseling', 'Religious Guidance'
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- e.g., 'pending', 'confirmed', 'cancelled', 'completed'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Educational Programs Table
CREATE TABLE educational_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_audience VARCHAR(255), -- e.g., 'Children', 'Youth', 'Adults'
    start_date DATE,
    end_date DATE,
    schedule_details VARCHAR(255), -- e.g., 'Mon/Wed/Fri 5-7 PM'
    instructor VARCHAR(255),
    price DECIMAL(10, 2),
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Content Pages Table (for static content like About Us, Welcome, etc.)
CREATE TABLE content_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    language_code VARCHAR(10) NOT NULL, -- e.g., 'en', 'de', 'ar'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Media Table (for images, videos for events, programs, general content)
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL, -- URL or path on storage
    file_type VARCHAR(50) NOT NULL, -- e.g., 'image/jpeg', 'video/mp4'
    alt_text TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    uploaded_by_user_id UUID REFERENCES users(id)
);

-- Multilingual Support Table (for labels, navigation, etc.)
CREATE TABLE translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(255) NOT NULL, -- e.g., 'navbar.home', 'footer.contact'
    language_code VARCHAR(10) NOT NULL, -- e.g., 'en', 'de', 'ar'
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (key, language_code)
);
