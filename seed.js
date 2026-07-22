const mongoose = require("mongoose");
require("dotenv").config();

// Use the MONGO_URL that's set in Railway
const mongoUri = process.env.MONGO_URL || process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ MONGO_URL or MONGO_URI environment variable not set");
  process.exit(1);
}

console.log("Using MongoDB URI:", mongoUri.replace(/:[^:]*@/, ":***@"));

const Category = require("./models/Category");
const Cars = require("./models/Cars");
const Banner = require("./models/Banner");
const Counter = require("./models/Counter");
const Information = require("./models/Information");

async function seedDatabase() {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Category.deleteMany({});
    await Cars.deleteMany({});
    await Banner.deleteMany({});
    await Counter.deleteMany({});
    await Information.deleteMany({});

    // Create Categories
    const categories = await Category.insertMany([
      { category_name: "Sedan" },
      { category_name: "SUV" },
      { category_name: "Sports" },
      { category_name: "Truck" }
    ]);
    console.log("✅ Categories created");

    // Create Cars
    const cars = await Cars.insertMany([
      {
        category_id: categories[0]._id,
        car_name: "Toyota Camry",
        car_image: "https://via.placeholder.com/300x200?text=Toyota+Camry",
        description: "Reliable and fuel-efficient sedan",
        price: 25000,
        featured: true
      },
      {
        category_id: categories[1]._id,
        car_name: "Ford Explorer",
        car_image: "https://via.placeholder.com/300x200?text=Ford+Explorer",
        description: "Spacious 3-row SUV",
        price: 35000,
        featured: true
      },
      {
        category_id: categories[2]._id,
        car_name: "Porsche 911",
        car_image: "https://via.placeholder.com/300x200?text=Porsche+911",
        description: "High-performance sports car",
        price: 110000,
        featured: true
      },
      {
        category_id: categories[3]._id,
        car_name: "Ford F-150",
        car_image: "https://via.placeholder.com/300x200?text=Ford+F-150",
        description: "Powerful pickup truck",
        price: 35000,
        featured: false
      }
    ]);
    console.log("✅ Cars created");

    // Create Banners
    await Banner.insertMany([
      {
        banner_image: "https://via.placeholder.com/1200x400?text=Premium+Cars",
        banner_text: "Discover Our Premium Collection"
      },
      {
        banner_image: "https://via.placeholder.com/1200x400?text=Best+Deals",
        banner_text: "Best Deals on New & Used Cars"
      }
    ]);
    console.log("✅ Banners created");

    // Create Counters
    await Counter.insertMany([
      { name: "carsSold", value: 1250 },
      { name: "happyCustomers", value: 890 },
      { name: "yearsInBusiness", value: 15 }
    ]);
    console.log("✅ Counters created");

    // Create Information
    await Information.insertMany([
      {
        car_image: "https://via.placeholder.com/300x200?text=Company+Info",
        car_name: "About Us",
        description: "Leading car dealership with 15 years of excellence"
      }
    ]);
    console.log("✅ Information created");

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seedDatabase();

