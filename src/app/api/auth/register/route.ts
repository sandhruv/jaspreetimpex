import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { signToken } from "@/lib/auth";

function sendTokenResponse(user: any, statusCode: number) {
  const token = signToken(user._id.toString());
  return NextResponse.json(
    {
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        phone: user.phone,
      },
    },
    { status: statusCode }
  );
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, password, company, phone } = body;

    const user = await User.create({
      name,
      email,
      password,
      company,
      phone,
      role: "user",
    });

    return sendTokenResponse(user, 201);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
