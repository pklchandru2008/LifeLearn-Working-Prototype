# LifeLearn Prototype — Architecture

## Overview
LifeLearn is a static, client-side learning prototype built with vanilla JavaScript, CSS, and Vite. It is intentionally small and can be run locally without a backend or paid services.

## Components
- `src/main.js`: lesson data, search/category filters, lesson modal, quiz checking, completion state, and rendering.
- `src/style.css`: responsive visual design and accessible UI styling.
- `public/data/lessons.json`: example machine-readable sample dataset for future API/database integration.
- `localStorage`: saves completed lesson IDs in the current browser only.

## User flow
1. User opens the dashboard.
2. User selects an age group and filters/searches lesson cards.
3. User opens a lesson and reads the steps.
4. User answers a multiple-choice knowledge check.
5. User marks the lesson complete.
6. The dashboard progress summary updates and completion is saved locally.

## Current boundaries
- No login, remote API, server, analytics, or cloud sync.
- Age selection is a UI preference, not a safety or eligibility check.
- Lesson content is illustrative educational content; health and safety lessons are not a substitute for professional advice.
- No AI is used in the core prototype.

## Production evolution
A future production app could use Flutter for mobile, Node.js/Express for APIs, PostgreSQL for user/lesson records, Firebase Authentication/Cloud Messaging, and cloud storage for approved media. Add authorization, input validation, moderation/content review, backups, privacy notices, and security testing before production deployment.
