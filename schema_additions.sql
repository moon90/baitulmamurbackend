-- Additions for izwien.at functionality
-- New 'news' table
CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_en VARCHAR(255) NOT NULL,
    title_de VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL, -- For friendly URLs
    excerpt_en TEXT,
    excerpt_de TEXT,
    content_en TEXT,
    content_de TEXT,
    image_url VARCHAR(255),
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- New 'contact_submissions' table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Alter Events Table for multilingual support
ALTER TABLE events
ADD COLUMN title_en VARCHAR(255),
ADD COLUMN title_de VARCHAR(255),
ADD COLUMN description_en TEXT,
ADD COLUMN description_de TEXT,
ADD COLUMN location_en VARCHAR(255),
ADD COLUMN location_de VARCHAR(255);

-- Alter Educational Programs Table for multilingual support
ALTER TABLE educational_programs
ADD COLUMN title_en VARCHAR(255),
ADD COLUMN title_de VARCHAR(255),
ADD COLUMN description_en TEXT,
ADD COLUMN description_de TEXT,
ADD COLUMN target_audience_en VARCHAR(255),
ADD COLUMN target_audience_de VARCHAR(255),
ADD COLUMN schedule_details_en VARCHAR(255),
ADD COLUMN schedule_details_de VARCHAR(255),
ADD COLUMN instructor_en VARCHAR(255),
ADD COLUMN instructor_de VARCHAR(255);
