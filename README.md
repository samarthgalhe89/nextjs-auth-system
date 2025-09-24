🔐 Next.js Authentication System

A secure and modern authentication system built with Next.js, Node.js, and JWT.
Includes signup, login, forgot password, reset password, and protected routes with a clean UI powered by Tailwind CSS.

✨ Features

🔑 User Signup & Login with validation

🔒 JWT-based authentication for security

📧 Forgot & Reset Password with email integration

🛡️ Protected Routes & Middleware (role-based access possible)

🎨 Responsive UI with Tailwind CSS

⚡ Built on Next.js App Router + API routes

🌐 Easy deployment on Vercel

# Tech Stack

Frontend: Next.js 14, React, Tailwind CSS

Backend: Next.js API Routes (Node.js/Express-style)

Auth: JWT (JSON Web Tokens)

Email Service: Nodemailer (with Mailtrap for testing)

Database: MongoDB

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/samarthgalhe89/nextjs-full-auth.git
cd nextjs-full-auth

2️⃣ Install Dependencies
npm install
# or
yarn install

3️⃣ Setup Environment Variables

Create a .env.local file in the root:

# JWT Secret
JWT_SECRET=your_jwt_secret

# Mailtrap / SMTP Config
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_user
MAILTRAP_PASS=your_pass

4️⃣ Run the Development Server
npm run dev

App will be running at http://localhost:3000
