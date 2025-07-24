import dotenv from "dotenv";
dotenv.config();

import connectToDatabase from "../lib/mongoose.js";
import products from "../models/products.js";         

const seedProducts = [
    {
        id: 1,
        name: "4K Leather Boots",
        description: "Stylish boots in 4K glory",
        price: 3999,
        brand: "Slay!",
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1603787081207-362bcef7c144?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        name: "4K Leather Boots",
        description: "Stylish boots in 4K glory",
        price: 3999,
        brand: "Slay!",
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: 3,
        name: "4K Leather Boots",
        description: "Stylish boots in 4K glory",
        price: 3999,
        brand: "Slay!",
        category: "Footwear",
        image: "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: 4,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1627225925683-1da7021732ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 5,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1613651926752-0726ac268086?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHRyZW5kaW5nJTIwamFja2V0cyUyMGZvciUyMGdlbnolMjBib3lzfGVufDB8fDB8fHww"
    },
    {
        id: 6,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1716470435412-731a739f9bf8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJlbmRpbmclMjBwYW50cyUyMGZvciUyMGdlbnolMjBib3lzfGVufDB8fDB8fHww"
    },
    {
        id: 7,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1632084904795-9f2eb9340618?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 8,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1693989249334-012b708d2c07?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 9,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1716470435412-731a739f9bf8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJlbmRpbmclMjBwYW50cyUyMGZvciUyMGdlbnolMjBib3lzfGVufDB8fDB8fHww"
    },
    {
        id: 10,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 11,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1541778480-fc1752bbc2a9?q=80&w=1296&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 12,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1660038018942-9880022c039b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 13,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1628785517892-dbcd2f2719ed?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 14,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1677913839722-fb906b4abce3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 15,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1679534591023-d2819ab8e4d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 16,
        name: "Streetwear Hoodie",
        description: "Warm, trendy, and ready to flex",
        price: 2599,
        brand: "Slay!",
        category: "Mens Clothing",
        image: "https://images.unsplash.com/photo-1708389828529-9830eb55bab3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
   
]

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