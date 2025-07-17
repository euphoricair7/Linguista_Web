-- Seed data is skipped for now since it requires authenticated users
-- You can create sample data through the application interface after user registration

-- Sample data structure for reference:
-- 
-- INSERT INTO events (title, description, event_date, event_time, duration_hours, location, type, languages, max_attendees, created_by) VALUES
-- ('Poetry Reading Night', 'Share your original works in any language and listen to beautiful poetry from our community members.', '2024-02-15', '19:00', 2.0, 'Community Center', 'poetry', ARRAY['English', 'Spanish', 'French'], 30, 'user-id-here');
-- 
-- INSERT INTO wiki_pages (title, slug, content, language, category, tags, created_by, last_edited_by) VALUES
-- ('Spanish Subjunctive Mood', 'spanish-subjunctive-mood', 'The subjunctive mood in Spanish is used to express doubt, emotion, desire, or hypothetical situations...', 'Spanish', 'grammar', ARRAY['spanish', 'grammar', 'subjunctive'], 'user-id-here', 'user-id-here');

SELECT 'Seed data preparation complete - tables are ready for data entry through the application.' AS message;
