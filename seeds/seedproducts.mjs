import dotenv from "dotenv";
dotenv.config();

import connectToDatabase from "../lib/mongoose.js";
import products from "../models/products.js";         

const seedProducts = [
  {
    id: 1,
    name: "4K Leather Boots",
    description: "Bold and stylish leather finish",
    price: 2999,
    brand: "Slay!",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1603787081207-362bcef7c144?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "White Rainbow Sneakers",
    description: "Playful colors meet clean design",
    price: 3199,
    brand: "Slay!",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 3,
    name: "Whiteout Sneakers",
    description: "Minimal all-white street pair",
    price: 2899,
    brand: "Slay!",
    category: "Footwear",
    image: "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 4,
    name: "Black Logo Tee",
    description: "Sleek street tee with bold branding",
    price: 1599,
    brand: "Slay!",
    category: "Mens Clothing",
    image: "https://images.unsplash.com/photo-1627225925683-1da7021732ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    name: "Urban Tan Jacket",
    description: "Statement jacket with bold flair",
    price: 2799,
    brand: "Slay!",
    category: "Mens Clothing",
    image: "https://images.unsplash.com/photo-1613651926752-0726ac268086?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHRyZW5kaW5nJTIwamFja2V0cyUyMGZvciUyMGdlbnolMjBib3lzfGVufDB8fDB8fHww"
  },
  {
    id: 6,
    name: "Red Vibe Tee",
    description: "Cool pop red for standout look",
    price: 1799,
    brand: "Slay!",
    category: "Mens Clothing",
    image: "https://images.unsplash.com/photo-1716470435412-731a739f9bf8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJlbmRpbmclMjBwYW50cyUyMGZvciUyMGdlbnolMjBib3lzfGVufDB8fDB8fHww"
  },
  {
    id: 7,
    name: "Oversized Maroon Fit",
    description: "Baggy and bold for streetwear heads",
    price: 2199,
    brand: "Slay!",
    category: "Mens Clothing",
    image: "https://images.unsplash.com/photo-1632084904795-9f2eb9340618?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 8,
    name: "Boho Palazzo Pants",
    description: "Comfy fit with indie spirit",
    price: 1899,
    brand: "Slay!",
    category: "Womens Clothing",
    image: "https://images.unsplash.com/photo-1693989249334-012b708d2c07?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 9,
    name: "Gold Trim Watch",
    description: "Luxury wristwear for sleek timekeeping",
    price: 7499,
    brand: "Slay!",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 10,
    name: "Royal Link Bracelet",
    description: "Statement gold wrist chain",
    price: 3199,
    brand: "Slay!",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1541778480-fc1752bbc2a9?q=80&w=1296&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 11,
    name: "Grey Minimal Watch",
    description: "Subtle style, bold presence",
    price: 2399,
    brand: "Slay!",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1660038018942-9880022c039b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 12,
    name: "Dual Stack Bands",
    description: "Stacked silver finger rings",
    price: 1299,
    brand: "Slay!",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1628785517892-dbcd2f2719ed?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 13,
    name: "Matte Finish Ring",
    description: "Smooth, dark, and minimal",
    price: 999,
    brand: "Slay!",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1677913839722-fb906b4abce3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 14,
    name: "Chain Lock Pendant",
    description: "Edgy necklace for bold styling",
    price: 1099,
    brand: "Slay!",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1679534591023-d2819ab8e4d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 15,
    name: "Rose Gold Rings",
    description: "Elegant pair for minimal chic",
    price: 1399,
    brand: "Slay!",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1708221269429-9d4e0f320e60?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 16,
    name: "Knuckle Wrap Rings",
    description: "Trendy rings with layered look",
    price: 1199,
    brand: "Slay!",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1708389828529-9830eb55bab3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const run = async () => {
    try {
        await connectToDatabase();
        await products.deleteMany()
        await products.insertMany(seedProducts)
        console.log("products seeded");
        process.exit();
    }
    catch(err){
        console.log("server error", err)
        process.exit(1)
    }
}

run();