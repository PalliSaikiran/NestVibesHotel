# NestVibes - Property Listing Platform

A modern property listing website built with Node.js, Express, MongoDB, and EJS.

## Features

- **Property Listings**: Browse, search, and filter properties
- **User Authentication**: Registration, login, and session management
- **Authorization**: Users can only edit/delete their own listings
- **Reviews**: Add and delete reviews for properties
- **Responsive Design**: Mobile-friendly interface
- **Image Support**: Property photos with fallback placeholders

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS templates
- **Authentication**: bcrypt for password hashing, express-session
- **Styling**: Custom CSS with modern design

## Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/NestVibes
   SESSION_SECRET=your_super_secret_key_change_me
   ```

3. **Start MongoDB**
   - Make sure MongoDB is running locally
   - Or use MongoDB Atlas (free tier)

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

6. **Visit the site**
   ```
   http://localhost:3000
   ```

### Test User

```
Username: testuser
Email: test@example.com
Password: password123
```

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

### Quick Deploy (Render.com)

1. **Set up MongoDB Atlas** (free tier)
2. **Push to GitHub**
3. **Deploy on Render** with these environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `SESSION_SECRET`: Run `npm run generate-secret`
   - `PORT`: 3000

## Project Structure

```
nestvibes/
├── controllers/       # Route controllers
├── middleware/       # Custom middleware
├── models/          # Mongoose models
├── public/          # Static assets (CSS, JS)
├── routes/          # Express routes
├── seeds/           # Database seeding scripts
├── utils/           # Utility functions
├── views/           # EJS templates
├── app.js           # Main application file
└── package.json     # Dependencies
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run seed` - Seed database with sample listings
- `npm run generate-secret` - Generate a random session secret

## Features in Detail

### Property Management
- Create, read, update, delete listings
- Image upload with fallback support
- Category-based filtering
- Price-based sorting
- Location-based search

### User System
- Secure password hashing with bcrypt
- Session-based authentication
- Owner-only edit/delete permissions
- User profile display in navbar

### Reviews
- Star rating system (1-5 stars)
- Review text with validation
- Delete own reviews
- Average rating calculation

## License

ISC
