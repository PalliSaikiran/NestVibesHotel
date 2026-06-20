/**
 * Seed script – populates the DB with sample listings.
 * Run with: node seeds/seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const Review  = require('../models/Review');
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nestvibes';

const sampleListings = [
  {
    title: 'Cozy Beachfront Studio',
    description: 'Wake up to ocean waves in this bright studio just steps from the beach. Perfect for couples seeking a peaceful getaway with all modern amenities.',
    price: 3500,
    location: 'Goa',
    country: 'India',
    category: 'Studio',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Heritage Haveli in the Old City',
    description: 'Experience royal Rajasthani living in this restored 18th-century haveli with intricate frescoes, a courtyard, and rooftop dining under the stars.',
    price: 7200,
    location: 'Jaipur',
    country: 'India',
    category: 'Villa',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Modern High-Rise Apartment',
    description: 'Sleek 2BHK on the 22nd floor with panoramic city views, fully equipped kitchen, fast Wi-Fi, and proximity to the financial district.',
    price: 4800,
    location: 'Mumbai',
    country: 'India',
    category: 'Apartment',
    image: 'https://images.pexels.com/photos/1484387/pexels-photo-1484387.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Lakeside Wooden Cabin',
    description: 'Rustic yet comfortable cabin nestled between pine trees beside Naini Lake. Includes a private deck, BBQ grill, and kayak rental.',
    price: 2900,
    location: 'Nainital',
    country: 'India',
    category: 'Cabin',
    image: 'https://images.pexels.com/photos/1449158/pexels-photo-1449158.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Luxury Hilltop Villa',
    description: 'Stunning 4-bedroom villa on a private hill with an infinity pool, garden, chef service, and 360° views of the valley. Ideal for family retreats.',
    price: 18500,
    location: 'Coorg',
    country: 'India',
    category: 'Villa',
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Backpacker Condo near Tech Hub',
    description: 'Affordable private condo in Koramangala with fast internet, co-working space access, and easy metro connectivity. Great for digital nomads.',
    price: 1500,
    location: 'Bengaluru',
    country: 'India',
    category: 'Condo',
    image: 'https://images.pexels.com/photos/1484388/pexels-photo-1484388.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Scenic Mountain Retreat',
    description: 'Escape to this charming mountain cottage surrounded by tea plantations. Features a fireplace, wooden interiors, and stunning sunrise views.',
    price: 5500,
    location: 'Munnar',
    country: 'India',
    category: 'Cabin',
    image: 'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Beachfront Villa with Private Pool',
    description: 'Luxurious 3-bedroom villa right on Varkala beach with a private infinity pool, personal chef, and direct beach access.',
    price: 12000,
    location: 'Varkala',
    country: 'India',
    category: 'Villa',
    image: 'https://images.pexels.com/photos/189293/pexels-photo-189293.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Urban Loft in City Center',
    description: 'Trendy loft apartment in the heart of Connaught Place with modern decor, rooftop access, and walking distance to metro.',
    price: 6500,
    location: 'New Delhi',
    country: 'India',
    category: 'Apartment',
    image: 'https://images.pexels.com/photos/271818/pexels-photo-271818.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Traditional Kerala Houseboat',
    description: 'Experience the backwaters in a beautifully furnished houseboat with bedrooms, living area, and onboard chef serving authentic Kerala cuisine.',
    price: 8900,
    location: 'Alleppey',
    country: 'India',
    category: 'Other',
    image: 'https://images.pexels.com/photos/2582927/pexels-photo-2582927.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Desert Camp in Jaisalmer',
    description: 'Luxury desert camping experience with Swiss tents, cultural performances, camel safaris, and stargazing in the Thar Desert.',
    price: 4200,
    location: 'Jaisalmer',
    country: 'India',
    category: 'Cabin',
    image: 'https://images.pexels.com/photos/2389075/pexels-photo-2389075.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Colonial Bungalow in Ooty',
    description: 'Heritage colonial bungalow with sprawling gardens, vintage furniture, and panoramic views of the Nilgiri hills.',
    price: 9800,
    location: 'Ooty',
    country: 'India',
    category: 'House',
    image: 'https://images.pexels.com/photos/2582923/pexels-photo-2582923.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Modern Studio in IT Park',
    description: 'Contemporary studio apartment in HITEC City with smart home features, gym access, and proximity to tech companies.',
    price: 3200,
    location: 'Hyderabad',
    country: 'India',
    category: 'Studio',
    image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Riverside Cottage',
    description: 'Peaceful cottage beside the Ganges with meditation deck, organic garden, and easy access to ghats and temples.',
    price: 3800,
    location: 'Rishikesh',
    country: 'India',
    category: 'Cabin',
    image: 'https://images.pexels.com/photos/1478013/pexels-photo-1478013.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Penthouse with Sea View',
    description: 'Exclusive penthouse in Marine Drive with 360° sea views, private terrace, jacuzzi, and concierge service.',
    price: 25000,
    location: 'Mumbai',
    country: 'India',
    category: 'Condo',
    image: 'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

async function seed() {
  // Use the MONGO_URI from environment variable
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Listing.deleteMany({});
  await Review.deleteMany({});
  await User.deleteMany({});
  console.log('Cleared existing data');

  // Create a test user
  const testUser = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  });
  console.log('Created test user');

  // Assign owner to all listings
  const listingsWithOwner = sampleListings.map(listing => ({
    ...listing,
    owner: testUser._id
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log(`✅ Seeded ${sampleListings.length} listings`);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
