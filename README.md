🍽️ FoodieLand – Recipe Sharing App

FoodieLand is a MERN stack web application where users can create, edit, share, and explore amazing recipes from around the world. It has secure authentication and a clean, modern UI for a great cooking community experience.

Features

• User registration and login
• Add, edit, and delete your own recipes
• View all recipes on the home page
• Category-based recipes (Breakfast, Lunch, Dinner, Dessert, Snack, Beverages)
• Mark recipes as Vegetarian
• Like recipes ❤️
• Responsive and user-friendly UI

Tech Stack

Frontend: React.js, Axios, React Router
Backend: Node.js, Express.js, MongoDB, JWT
Database: MongoDB Atlas

Folder Structure

recipe-sharing-app/
│ backend/
│ │ models/
│ │ routes/
│ │ controllers/
│ │ config/db.js
│ │ server.js
│
│ frontend/
│ │ src/
│ │ public/
│ │ package.json
│ │ vite.config.js

How to Run Locally

Install Node.js and MongoDB

Clone the project:
git clone https://github.com/Daneshwari5611/recipe-sharing-app

Setup Backend:
cd backend
npm install
create .env file:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
npm run dev

Setup Frontend:
cd ../frontend
npm install
npm run dev

To-Do / Future Enhancements

• Deploy frontend & backend
• Add favorites, comments, and ratings
• Upload images instead of URLs
• Social sharing for recipes

Author

Developed by: Daneshwari
GitHub: github.com/Daneshwari5611
