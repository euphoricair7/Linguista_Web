# Linguista Web

A modern web application for language learners and literature enthusiasts, built with Next.js and Supabase.

## Features

- **User Profiles**: Create and manage language learning profiles
- **Content Sharing**: Share poetry, literature, and language resources
- **Events**: Create and join language learning and cultural events
- **Wiki**: Collaborative knowledge base for language learning
- **Community**: Connect with other language learners worldwide

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **Package Manager**: pnpm

## Setup Instructions

### 1. Prerequisites

Make sure you have the following installed:
- Node.js (v18 or higher)
- pnpm (`npm install -g pnpm`)
- PostgreSQL client (for database setup)

### 2. Clone and Install Dependencies


# Set up database (first time or after reset)
pnpm run db:setup
# or
./setup-database.sh

# Reset database (drops all tables and data)
pnpm run db:reset
# or
./reset-database.sh

# Start your application
pnpm dev


```bash
git clone <your-repo-url>
cd Linguista_Web
pnpm install
```

### 3. Database Setup

#### Option A: Using Supabase (Recommended)

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Database Configuration (for running scripts)
DATABASE_URL=postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres
```

4. Run the database setup script:

```bash
./setup-database.sh
```

#### Option B: Using Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database named `linguista_web`
3. Update the `DATABASE_URL` in `.env.local`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/linguista_web
```

4. Run the setup script:

```bash
./setup-database.sh
```

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Database Schema

The application uses the following main tables:

- **profiles**: User profiles and language learning information
- **posts**: User-generated content (poetry, literature, resources)
- **events**: Language learning and cultural events
- **wiki_pages**: Collaborative knowledge base
- **comments**: Comments on posts and wiki pages
- **post_likes**: User likes on posts
- **event_attendees**: Event attendance tracking

## Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `./setup-database.sh`: Set up database tables and initial data

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── dashboard/       # Dashboard pages
│   ├── events/          # Event management
│   ├── login/           # Authentication
│   ├── posts/           # Content sharing
│   ├── profile/         # User profiles
│   ├── settings/        # User settings
│   └── wiki/            # Knowledge base
├── components/          # Reusable UI components
├── lib/                 # Utility functions and configurations
├── scripts/             # Database setup scripts
└── public/              # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure everything works
5. Submit a pull request

## License

This project is licensed under the MIT License.