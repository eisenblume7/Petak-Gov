import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Project } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    const body: Project = await request.json();
    const project = await prisma.project.create({
        data:{
            name: body.name,
            location: body.location,
            ownerId: body.ownerId
        }
    });
    return NextResponse.json(project, {status: 201});
}