import { NextResponse } from "next/server";
import {Pengguna, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: Pengguna = await request.json();
    const pengguna = await prisma.pengguna.update({
        where:{
            id: Number(params.id)
        },
        data:{
            name: body.name,
            email: body.email,
            password: body.password,
        }
    });
    return NextResponse.json(pengguna, {status: 200});
}
