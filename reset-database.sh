#!/bin/bash

# Database reset script for Linguista Web
# This script drops all tables and policies to start fresh

# Load environment variables from .env.local
if [ -f ".env.local" ]; then
    echo "📋 Loading environment variables from .env.local..."
    export $(grep -v '^#' .env.local | xargs)
else
    echo "❌ .env.local file not found"
    exit 1
fi

# Check if environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set"
    exit 1
fi

# Clean up DATABASE_URL
CLEAN_DATABASE_URL=$(echo "$DATABASE_URL" | sed 's/?pgbouncer=true//')
CLEAN_DATABASE_URL=$(echo "$CLEAN_DATABASE_URL" | sed 's/6543/5432/')

echo "🧹 Resetting Linguista Web database..."
echo "⚠️  This will drop all existing tables and data!"
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted"
    exit 1
fi

# Drop all tables in reverse order (respecting foreign key constraints)
echo "📄 Dropping tables..."
psql "$CLEAN_DATABASE_URL" -c "
DROP TABLE IF EXISTS wiki_page_history CASCADE;
DROP TABLE IF EXISTS wiki_pages CASCADE;
DROP TABLE IF EXISTS event_attendees CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
" -v ON_ERROR_STOP=1

if [ $? -eq 0 ]; then
    echo "✅ All tables dropped successfully"
else
    echo "❌ Error dropping tables"
    exit 1
fi

echo "🎉 Database reset complete!"
echo "Run ./setup-database.sh to recreate the database"
