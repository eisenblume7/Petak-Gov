import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Pengguna } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: Pengguna = await request.json();
    const pengguna = await prisma.pengguna.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password,
        }
    });
    return NextResponse.json(pengguna, {status: 201});
}