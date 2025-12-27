-- Demo data for news table
INSERT INTO news (title_en, title_de, slug, excerpt_en, excerpt_de, content_en, content_de, image_url, is_published, published_at) VALUES
('IZW Holds Successful Youth Workshop', 'IZW veranstaltet erfolgreichen Jugend-Workshop', 'izw-youth-workshop', 'Young participants engaged in discussions about faith and community building.', 'Junge Teilnehmer diskutierten über Glauben und Gemeinschaftsaufbau.', 'Full details of the successful youth workshop held last weekend. Topics included Islamic ethics and social responsibility, fostering a vibrant atmosphere of learning and interaction.', 'Vollständige Details zum erfolgreichen Jugend-Workshop vom letzten Wochenende. Themen waren islamische Ethik und soziale Verantwortung, was eine lebendige Lern- und Interaktionsatmosphäre förderte.', 'https://via.placeholder.com/600x400?text=Youth+Workshop', TRUE, CURRENT_TIMESTAMP - INTERVAL '5 days'),
('New Quran Recitation Classes Announced', 'Neue Koran-Rezitationskurse angekündigt', 'new-quran-classes', 'Enrollment is now open for beginners and advanced students.', 'Anmeldung für Anfänger und Fortgeschrittene ist jetzt möglich.', 'The Islamic Center Vienna is pleased to announce new Quran recitation classes starting next month. Open to all ages and levels, these classes aim to improve Tajweed and understanding of the Quran.', 'Das Islamische Zentrum Wien freut sich, neue Koran-Rezitationskurse ab nächsten Monat anzukündigen. Offen für alle Altersgruppen und Niveaus, zielen diese Kurse darauf ab, die Tajweed-Regeln und das Verständnis des Korans zu verbessern.', 'https://via.placeholder.com/600x400?text=Quran+Classes', TRUE, CURRENT_TIMESTAMP - INTERVAL '10 days'),
('Eid al-Adha Preparations Underway', 'Vorbereitungen für Eid al-Adha laufen', 'eid-al-adha-prep', 'Join us for special prayers and community celebrations.', 'Begleiten Sie uns zu besonderen Gebeten und Gemeinschaftsfeiern.', 'Preparations for the upcoming Eid al-Adha celebrations are in full swing at the Islamic Center Vienna. Details regarding prayer times, social gatherings, and volunteer opportunities will be announced soon.', 'Die Vorbereitungen für die bevorstehenden Eid al-Adha-Feierlichkeiten laufen im Islamischen Zentrum Wien auf Hochtouren. Details zu Gebetszeiten, gesellschaftlichen Zusammenkünften und Freiwilligenmöglichkeiten werden in Kürze bekannt gegeben.', 'https://via.placeholder.com/600x400?text=Eid+Prep', TRUE, CURRENT_TIMESTAMP - INTERVAL '15 days');

-- Demo data for events table
INSERT INTO events (title, description, start_time, end_time, location, image_url, category, is_featured, title_en, title_de, description_en, description_de, location_en, location_de) VALUES
('Community Iftar', 'Join us for a blessed Iftar gathering.', CURRENT_TIMESTAMP + INTERVAL '1 day' + INTERVAL '18 hours', CURRENT_TIMESTAMP + INTERVAL '1 day' + INTERVAL '20 hours', 'Main Prayer Hall', 'https://via.placeholder.com/600x400?text=Iftar', 'Religious', TRUE, 'Community Iftar (EN)', 'Gemeinschafts-Iftar (DE)', 'Join us for a blessed Iftar gathering with fellow community members.', 'Begleiten Sie uns zu einem gesegneten Iftar-Treffen mit anderen Gemeindemitgliedern.', 'Main Prayer Hall (EN)', 'Hauptgebetssaal (DE)'),
('Weekly Tafseer Session', 'Deep dive into the meanings of the Quran.', CURRENT_TIMESTAMP + INTERVAL '3 days' + INTERVAL '19 hours', CURRENT_TIMESTAMP + INTERVAL '3 days' + INTERVAL '21 hours', 'Lecture Room 1', 'https://via.placeholder.com/600x400?text=Tafseer', 'Education', FALSE, 'Weekly Tafseer Session (EN)', 'Wöchentliche Tafseer-Sitzung (DE)', 'Explore the profound meanings and interpretations of the Quran.', 'Erkunden Sie die tiefgründigen Bedeutungen und Interpretationen des Korans.', 'Lecture Room 1 (EN)', 'Vortragsraum 1 (DE)'),
('Youth Sports Day', 'Fun activities and sports for our youth.', CURRENT_TIMESTAMP + INTERVAL '7 days' + INTERVAL '10 hours', CURRENT_TIMESTAMP + INTERVAL '7 days' + INTERVAL '16 hours', 'Sports Hall', 'https://via.placeholder.com/600x400?text=Sports', 'Youth', TRUE, 'Youth Sports Day (EN)', 'Jugend-Sporttag (DE)', 'An exciting day of sports and games for the youth.', 'Ein aufregender Tag mit Sport und Spielen für die Jugend.', 'Sports Hall (EN)', 'Sporthalle (DE)');

-- Demo data for contact_submissions table
INSERT INTO contact_submissions (name, email, subject, message, is_read) VALUES
('John Doe', 'john.doe@example.com', 'General Inquiry', 'I have a question about your services.', FALSE),
('Jane Smith', 'jane.smith@example.com', 'Event Feedback', 'The last event was fantastic!', TRUE),
('Ahmed Khan', 'ahmed.khan@example.com', 'Volunteer Opportunity', 'I would like to volunteer for your upcoming events.', FALSE);

-- Demo data for educational_programs table
INSERT INTO educational_programs (title, description, target_audience, start_date, end_date, schedule_details, instructor, price, image_url, title_en, title_de, description_en, description_de, target_audience_en, target_audience_de, schedule_details_en, schedule_details_de, instructor_en, instructor_de) VALUES
('ISLAM Basic Course', 'Comprehensive introduction to Islam.', 'Adults', '2025-01-15', '2025-03-15', 'Every Tuesday and Thursday, 7-9 PM', 'Imam Omar', 0.00, 'https://via.placeholder.com/600x400?text=Basic+Islam', 'ISLAM Basic Course (EN)', 'ISLAM Basiskurs (DE)', 'A comprehensive introduction to the core tenets of Islam for new Muslims and interested individuals.', 'Eine umfassende Einführung in die Grundsätze des Islam für neue Muslime und Interessierte.', 'Adults (EN)', 'Erwachsene (DE)', 'Every Tuesday and Thursday, 7-9 PM (EN)', 'Jeden Dienstag und Donnerstag, 19-21 Uhr (DE)', 'Imam Omar (EN)', 'Imam Omar (DE)'),
('Quran Memorization for Kids', 'Fun and interactive hifdh program.', 'Children', '2025-02-01', '2025-06-01', 'Saturdays, 10 AM - 12 PM', 'Sister Fatima', 50.00, 'https://via.placeholder.com/600x400?text=Kids+Quran', 'Quran Memorization for Kids (EN)', 'Koran-Auswendiglernen für Kinder (DE)', 'An engaging and interactive program designed to help children memorize the Quran with proper Tajweed.', 'Ein ansprechendes und interaktives Programm, das Kindern hilft, den Koran mit den richtigen Tajweed-Regeln auswendig zu lernen.', 'Children (EN)', 'Kinder (DE)', 'Saturdays, 10 AM - 12 PM (EN)', 'Samstags, 10-12 Uhr (DE)', 'Sister Fatima (EN)', 'Schwester Fatima (DE)');


-- Demo data for translations table (add more as needed for other components/pages)
-- General UI elements
INSERT INTO translations (key, language_code, value) VALUES
('Welcome', 'en', 'Welcome'), ('Welcome', 'de', 'Willkommen'),
('The Mosque', 'en', 'The Mosque'), ('The Mosque', 'de', 'Die Moschee'),
('Contacts', 'en', 'Contacts'), ('Contacts', 'de', 'Kontakte'),
('Service', 'en', 'Service'), ('Service', 'de', 'Service'),
('Education & Culture', 'en', 'Education & Culture'), ('Education & Culture', 'de', 'Bildung & Kultur'),
('Aktuelles', 'en', 'News'), ('Aktuelles', 'de', 'Aktuelles'),
('Events', 'en', 'Events'), ('Events', 'de', 'Termine'),
('Social', 'en', 'Social'), ('Social', 'de', 'Soziales'),
('App', 'en', 'App'), ('App', 'de', 'App'),
('Islamisches Zentrum Wien', 'en', 'Islamic Center Vienna'), ('Islamisches Zentrum Wien', 'de', 'Islamisches Zentrum Wien'),
('Your spiritual home for peace, knowledge, and community.', 'en', 'Your spiritual home for peace, knowledge, and community.'), ('Your spiritual home for peace, knowledge, and community.', 'de', 'Ihr spirituelles Zuhause für Frieden, Wissen und Gemeinschaft.'),
('Learn More About Us', 'en', 'Learn More About Us'), ('Learn More About Us', 'de', 'Erfahren Sie mehr über uns'),
('Latest News', 'en', 'Latest News'), ('Latest News', 'de', 'Neueste Nachrichten'),
('View All News', 'en', 'View All News'), ('View All News', 'de', 'Alle Nachrichten ansehen'),
('Daily Prayer Times', 'en', 'Daily Prayer Times'), ('Daily Prayer Times', 'de', 'Tägliche Gebetszeiten'),
('Upcoming Events', 'en', 'Upcoming Events'), ('Upcoming Events', 'de', 'Bevorstehende Termine'),
('View All Events', 'en', 'View All Events'), ('View All Events', 'de', 'Alle Termine ansehen'),
('Our Mission', 'en', 'Our Mission'), ('Our Mission', 'de', 'Unsere Mission'),
('Islamisches Zentrum Wien is committed to fostering a vibrant and inclusive Muslim community. We strive to educate, inspire, and provide a sanctuary for spiritual growth, guided by the teachings of the Quran and Sunnah.', 'en', 'Islamic Center Vienna is committed to fostering a vibrant and inclusive Muslim community. We strive to educate, inspire, and provide a sanctuary for spiritual growth, guided by the teachings of the Quran and Sunnah.'), ('Islamisches Zentrum Wien is committed to fostering a vibrant and inclusive Muslim community. We strive to educate, inspire, and provide a sanctuary for spiritual growth, guided by the teachings of the Quran and Sunnah.', 'de', 'Das Islamische Zentrum Wien engagiert sich für eine lebendige und inklusive muslimische Gemeinschaft. Wir bemühen uns, zu bilden, zu inspirieren und einen Ort der spirituellen Entwicklung zu bieten, geleitet von den Lehren des Korans und der Sunna.'),
('Read Our Full Story', 'en', 'Read Our Full Story'), ('Read Our Full Story', 'de', 'Lesen Sie unsere vollständige Geschichte'),
('at', 'en', 'at'), ('at', 'de', 'um'),
('Category', 'en', 'Category'), ('Category', 'de', 'Kategorie'),
('Details', 'en', 'Details'), ('Details', 'de', 'Details'),
('Loading news...', 'en', 'Loading news...'), ('Loading news...', 'de', 'Nachrichten werden geladen...'),
('Error loading news:', 'en', 'Error loading news:'), ('Error loading news:', 'de', 'Fehler beim Laden der Nachrichten:'),
('No news articles found.', 'en', 'No news articles found.'), ('No news articles found.', 'de', 'Keine Nachrichtenartikel gefunden.'),
('Loading events...', 'en', 'Loading events...'), ('Loading events...', 'de', 'Termine werden geladen...'),
('Error loading events:', 'en', 'Error loading events:'), ('Error loading events:', 'de', 'Fehler beim Laden der Termine:'),
('No upcoming events found.', 'en', 'No upcoming events found.'), ('No upcoming events found.', 'de', 'Keine bevorstehenden Termine gefunden.'),
('Loading prayer times...', 'en', 'Loading prayer times...'), ('Loading prayer times...', 'de', 'Gebetszeiten werden geladen...'),
('Error:', 'en', 'Error:'), ('Error:', 'de', 'Fehler:'),
('No prayer times found for today.', 'en', 'No prayer times found for today.'), ('No prayer times found for today.', 'de', 'Keine Gebetszeiten für heute gefunden.'),
('Today\'s Prayer Times', 'en', 'Today\'s Prayer Times'), ('Today\'s Prayer Times', 'de', 'Heutige Gebetszeiten'),
('Fajr', 'en', 'Fajr'), ('Fajr', 'de', 'Fadschr'),
('Sunrise', 'en', 'Sunrise'), ('Sunrise', 'de', 'Sonnenaufgang'),
('Dhuhr', 'en', 'Dhuhr'), ('Dhuhr', 'de', 'Dhuhur'),
('Asr', 'en', 'Asr'), ('Asr', 'de', 'Asr'),
('Maghrib', 'en', 'Maghrib'), ('Maghrib', 'de', 'Maghrib'),
('Isha', 'en', 'Isha'), ('Isha', 'de', 'Ischa'),
('Read More', 'en', 'Read More'), ('Read More', 'de', 'Mehr lesen'),
('Aktuelles & News', 'en', 'News & Updates'), ('Aktuelles & News', 'de', 'Aktuelles & Nachrichten'),
('Contact Us', 'en', 'Contact Us'), ('Contact Us', 'de', 'Kontaktieren Sie uns'),
('We would love to hear from you. Please fill out the form below.', 'en', 'We would love to hear from you. Please fill out the form below.'), ('We would love to hear from you. Please fill out the form below.', 'de', 'Wir würden uns freuen, von Ihnen zu hören. Bitte füllen Sie das untenstehende Formular aus.'),
('Name', 'en', 'Name'), ('Name', 'de', 'Name'),
('Email', 'en', 'Email'), ('Email', 'de', 'E-Mail'),
('Subject', 'en', 'Subject'), ('Subject', 'de', 'Betreff'),
('Message', 'en', 'Message'), ('Message', 'de', 'Nachricht'),
('Send Message', 'en', 'Send Message'), ('Send Message', 'de', 'Nachricht senden'),
('Sending...', 'en', 'Sending...'), ('Sending...', 'de', 'Wird gesendet...'),
('Your message has been sent successfully!', 'en', 'Your message has been sent successfully!'), ('Your message has been sent successfully!', 'de', 'Ihre Nachricht wurde erfolgreich gesendet!'),
('Failed to send your message. Please try again.', 'en', 'Failed to send your message. Please try again.'), ('Failed to send your message. Please try again.', 'de', 'Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.'),
('An unexpected error occurred. Please try again later.', 'en', 'An unexpected error occurred. Please try again later.'), ('An unexpected error occurred. Please try again later.', 'de', 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.'),
('Am Bruckhaufen 3', 'en', 'Am Bruckhaufen 3'), ('Am Bruckhaufen 3', 'de', 'Am Bruckhaufen 3'),
('1210 Wien', 'en', '1210 Vienna'), ('1210 Wien', 'de', '1210 Wien'),
('office@islamiccentre.at', 'en', 'office@islamiccentre.at'), ('office@islamiccentre.at', 'de', 'office@islamiccentre.at'),
('+43 1 2933194', 'en', '+43 1 2933194'), ('+43 1 2933194', 'de', '+43 1 2933194'),
('IZW Apps', 'en', 'IZW Apps'), ('IZW Apps', 'de', 'IZW Apps'),
('Android App', 'en', 'Android App'), ('Android App', 'de', 'Android App'),
('iPhone App', 'en', 'iPhone App'), ('iPhone App', 'de', 'iPhone App'),
('Follow Us', 'en', 'Follow Us'), ('Follow Us', 'de', 'Folgen Sie uns'),
('Quick Links', 'en', 'Quick Links'), ('Quick Links', 'de', 'Schnelllinks'),
('Privacy Policy', 'en', 'Privacy Policy'), ('Privacy Policy', 'de', 'Datenschutzerklärung'),
('Impressum', 'en', 'Imprint'), ('Impressum', 'de', 'Impressum'),
('Dedicated to fostering a vibrant and inclusive Muslim community in Vienna. Providing spiritual guidance, education, and social support.', 'en', 'Dedicated to fostering a vibrant and inclusive Muslim community in Vienna. Providing spiritual guidance, education, and social support.'), ('Dedicated to fostering a vibrant and inclusive Muslim community in Vienna. Providing spiritual guidance, education, and social support.', 'de', 'Engagiert für eine lebendige und inklusive muslimische Gemeinschaft in Wien. Bereitstellung spiritueller Führung, Bildung und sozialer Unterstützung.'),
('All rights reserved.', 'en', 'All rights reserved.'), ('All rights reserved.', 'de', 'Alle Rechte vorbehalten.'),
('Made by MASJID•X', 'en', 'Made by MASJID•X'), ('Made by MASJID•X', 'de', 'Erstellt von MASJID•X'),
('This site uses cookies from Google to deliver its services and to analyze traffic.', 'en', 'This site uses cookies from Google to deliver its services and to analyze traffic.'), ('This site uses cookies from Google to deliver its services and to analyze traffic.', 'de', 'Diese Website verwendet Cookies von Google, um Dienste bereitzustellen und den Traffic zu analysieren.'),
('Cookie Policy', 'en', 'Cookie Policy'), ('Cookie Policy', 'de', 'Cookie-Richtlinie');
