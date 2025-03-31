# Recruitment Lead Generation Platform

A full-stack web application designed for recruitment business owners to identify and research potential client companies. This platform helps recruiters find and target hiring companies in specific niches, saving time on manual research.

## Features

- **Search companies** by industry, size, location, and hiring status
- Filter by sector, country, company size, hiring status, and recruitment agency usage
- View company details including roles hiring for, key decision-makers, and contact info
- Save leads to a custom dashboard
- Receive weekly update alerts for new companies matching search criteria
- User authentication system

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: Firebase
- **Web Scraping**: Puppeteer
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

## Installation and Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm run install:all
   ```
3. Set up environment variables:
   - Create a `.env` file in the `/backend` directory with your PostgreSQL and Firebase credentials
   - Create a `.env.local` file in the `/frontend` directory with your Firebase configuration

4. Run the development server:
   ```
   npm run dev
   ```

## Project Structure

```
lead-gen-app/
├── backend/              # Express server
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Utility functions
│   │   └── index.js      # Server entry point
├── frontend/             # Next.js client
│   ├── src/
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API clients
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utility functions
└── package.json          # Project configuration
``` 