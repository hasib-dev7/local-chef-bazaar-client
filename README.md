# Local Chef Bazzar Web App

## Project Name

**Delicious Meals** – Homemade Meals Ordering & Dashboard System

## Live URL

https://local-chef-bazaar-4acb09.netlify.app/

## Purpose

This project is a full-stack web application designed to let users explore, order, and review homemade meals prepared by local chefs. It includes a public-facing meals catalog, user dashboards, chef dashboards, and admin management features. The app emphasizes a smooth UX with global loading and error handling.

## Key Features

### Public User Features

- View all daily meals with chef info, price, rating, and delivery area
- Sort meals by price (ascending/descending)
- Search and filter meals (future)
- Meal details page
- Place orders with a user-friendly order form
- Global loading page while data is being fetched
- Error page for invalid URLs or API errors
- Login/Register functionality

### User Dashboard

- View and manage personal orders
- Submit and view reviews
- View favorite meals

### Chef Dashboard

- Add new meals
- View and manage own meals
- Handle order requests from customers

### Admin Dashboard

- Manage users
- Manage meal requests
- View platform statistics

### Additional Features

- Responsive design for desktop and mobile
- React Query for data fetching
- Toast notifications (react-toastify & react-hot-toast)
- Private routes with role-based access
- Error boundaries using React Router `errorElement`

## Tech Stack

- **Frontend:** React, React Router v6, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB
- **State Management / Data Fetching:** React Query
- **Notifications:** react-toastify, react-hot-toast
- **Icons:** Lucide-react
- **Animations:** Framer Motion (optional)
- **Other Packages:** axios, sweetalert2

## NPM Packages Used

- `react-router-dom` – Routing
- `react-query` – Data fetching and caching
- `axios` – HTTP requests
- `react-toastify` – Toast notifications
- `react-hot-toast` – Toast notifications
- `lucide-react` – Icons
- `framer-motion` – Animations
- `sweetalert2` – Alerts & confirmations
- `tailwindcss` – Styling
- `react` & `react-dom` – Frontend library
