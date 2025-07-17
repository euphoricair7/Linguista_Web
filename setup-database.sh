#!/bin/bash

# Database setup script for Linguista Web
# This script runs all SQL files in order to set up the database

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
    echo "Please set it in your .env.local file or export it:"
    echo "export DATABASE_URL='postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres'"
    exit 1
fi

# Clean up DATABASE_URL (remove pgbouncer parameter if present and fix port)
CLEAN_DATABASE_URL=$(echo "$DATABASE_URL" | sed 's/?pgbouncer=true//')
CLEAN_DATABASE_URL=$(echo "$CLEAN_DATABASE_URL" | sed 's/6543/5432/')

echo "🚀 Setting up Linguista Web database..."
echo "🔗 Connecting to: $(echo "$CLEAN_DATABASE_URL" | sed 's/:.*@/:***@/')"

# Test connection first
echo "🔍 Testing database connection..."
psql "$CLEAN_DATABASE_URL" -c "SELECT version();" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Failed to connect to database"
    echo "Please check your DATABASE_URL and ensure:"
    echo "1. Your database is running"
    echo "2. The credentials are correct"
    echo "3. The host is reachable"
    echo ""
    echo "Current DATABASE_URL (masked): $(echo "$CLEAN_DATABASE_URL" | sed 's/:.*@/:***@/')"
    exit 1
fi
echo "✅ Database connection successful"

# Array of SQL files to run in order
SQL_FILES=(
    "01-create-tables.sql"
    "02-create-policies.sql"
    "03-create-functions.sql"
    "04-seed-data.sql"
)

# Function to run a SQL file
run_sql_file() {
    local file=$1
    echo "📄 Running $file..."
    
    if [ -f "scripts/$file" ]; then
        psql "$CLEAN_DATABASE_URL" -f "scripts/$file" -v ON_ERROR_STOP=1
        if [ $? -eq 0 ]; then
            echo "✅ $file completed successfully"
        else
            echo "❌ Error running $file"
            echo "Check the output above for details"
            exit 1
        fi
    else
        echo "❌ File scripts/$file not found"
        exit 1
    fi
    echo ""
}

# Run each SQL file
for file in "${SQL_FILES[@]}"; do
    run_sql_file "$file"
done

echo "🎉 Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Your database is now configured with all tables and policies"
echo "2. Run 'pnpm dev' to start the development server"
echo "3. Visit http://localhost:3000 to see your application"
