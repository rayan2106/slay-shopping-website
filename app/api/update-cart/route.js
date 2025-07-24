import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import { verifytoken } from "@/lib/auth-edge";
import { NextResponse } from "next/server";

export async function POST(req) {
  try{
  const token = await req.cookies.get('token')?.value;

  const verified = await verifytoken(token);

  if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId, action, quantity = 1 } = await req.json();

  await connectToDatabase();
  const user = await User.findById(verified.id)

  
  const index = user.cart.findIndex((item) => item.productId === productId)
  console.log(action)
  console.log(productId)
  
  if (action === 'add') {
    user.cart.push({ productId, quantity })
  }
  else if (action === 'update') {
    user.cart[index].quantity = quantity;
  }
  else if (action === 'remove') {
    user.cart = user.cart.filter(item => item.productId.toString() !== productId.toString())
  }
  await user.save();

  const isincart = user.cart.some((item) => item.productId.toString() === productId.toString())

  console.log(user.cart)

  return NextResponse.json({ success: true , cart: isincart })
}catch(err){
  console.log(err)
  return NextResponse.json({message: "not able to add"})
}
}