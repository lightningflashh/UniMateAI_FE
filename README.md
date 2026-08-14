# UniMateAI Frontend

Welcome to UniMateAI, a modern web app designed to help students and administrators explore university admission opportunities more easily.

This frontend is built with Next.js and helps users:

- log in and manage accounts
- explore universities, majors, and admission methods
- view dashboard statistics and recent data
- get AI-powered university recommendations based on score and preferences
- manage academic data in an admin-friendly interface

## What this project does

UniMateAI is like a smart admission assistant for students.

Students can enter their score, admission year, and preferred major group, then the app suggests universities and majors that are a good match. The app also includes admin dashboard pages for managing universities, majors, admission rules, and stats.

In simple words:

- students get guidance
- admins manage data
- the interface feels modern and easy to use

## Main features

### Authentication

- login and register pages
- secure token handling with refresh flow
- protected dashboard routes

### Recommendation system

- enter score, year, and admission method
- choose major group if needed
- receive recommendation results ranked by fit and chance

### University and major management

- add, edit, and delete universities
- manage majors and groups
- manage admission methods and score criteria

### Dashboard and analytics

- overview cards
- recent university and user data
- admission chart and statistics views

### User experience

- responsive layout
- clean admin interface
- data tables, filters, and forms

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- React Hook Form + Zod
- Axios
- Recharts
- Jest + Testing Library

## Project structure

```bash
src/
├── app/                 # App routes and layouts
├── components/          # Reusable UI and layout components
├── constants/           # Navigation/config constants
├── features/            # Feature-based modules
│   ├── auth/
│   ├── admission/
│   ├── major/
│   ├── recommendation/
│   ├── university/
│   └── user/
├── hooks/               # Custom hooks
├── lib/                 # Utility functions and axios config
├── providers/           # App providers
├── stores/              # Global state
├── types/               # TypeScript interfaces
└── app/globals.css      # Global styling
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Make sure your local environment has the backend API URL configured.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 3. Run the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available scripts

```bash
npm run dev          # run the app in development mode
npm run build        # build the production app
npm run start        # run the production build
npm run lint         # check code quality
npm run test         # run tests
npm run test:watch   # watch mode for tests
npm run test:coverage # run tests with coverage
```

## Main pages

- `/login` — login page
- `/register` — create an account
- `/dashboard` — main admin dashboard overview
- `/universities` — manage universities
- `/majors` — manage majors
- `/favorites` — saved favorite items
- `/statistics` — analytics and reports
- `/recommendation` — AI recommendation page for students

## Notes

This frontend depends on a backend API for authentication, recommendation logic, and academic data. If the backend is not running, some pages may not work properly.

## License

This project is for internal or educational use unless a different license is specified by the project owner.

## Quick summary

UniMateAI Frontend is a friendly, modern application that helps students find better university options and gives admins a clean way to manage academic information. It combines a polished UI, secure authentication, and recommendation features into one easy-to-use experience.
