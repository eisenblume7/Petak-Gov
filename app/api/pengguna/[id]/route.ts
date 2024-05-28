import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { ProjectTracking } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: ProjectTracking = await request.json();
    const projecTracking = await prisma.projectTracking.update({
        where:{
            id: Number(params.id)
        },
        data:{
            projectId: body.projectId,
            penggunaId: body.penggunaId,
        }
    });
    return NextResponse.json(projecTracking, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const projectTracking = await prisma.projectTracking.delete({
        where:{
            id: Number(params.id)
        }
    });
    return NextResponse.json(projectTracking, {status: 200});
}