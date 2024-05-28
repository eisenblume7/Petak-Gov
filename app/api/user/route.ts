
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import type { Pengguna } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body: Pengguna = await req.json();

        const existingUserbyEmail = await prisma.pengguna.findUnique({
            where: { email: body.email}
        })
        if(existingUserbyEmail) {
            return NextResponse.json({pengguna: null, message: "User with this email already exist!"}, {status: 409} )
        }

        const hashedPassword = await hash(body.password, 8)
        const newUser = await prisma.pengguna.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            }
        })
        return NextResponse.json({ pengguna: newUser, message: "User Created Successfully"}, {status: 201})
    }   catch (error) {
        return NextResponse.json({ message: "Something Went Wrong"}, {status: 500})
    }
    
}