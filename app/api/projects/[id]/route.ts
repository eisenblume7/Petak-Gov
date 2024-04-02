import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Project } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: Project = await request.json();
    const product = await prisma.project.update({
        where:{
            id: Number(params.id)
        },
        data:{
            name: body.name,
            location: body.location,
            kategoriId: body.kategoriId,
            ownerId: body.ownerId,
            statusId: body.statusId
        }
    });
    return NextResponse.json(product, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const product = await prisma.project.delete({
        where:{
            id: Number(params.id)
        }
    });
    return NextResponse.json(product, {status: 200});
}