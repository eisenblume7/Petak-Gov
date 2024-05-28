import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { ProjectTracking } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    const body: ProjectTracking = await request.json();
    const projectTracking = await prisma.projectTracking.create({
        data:{
            projectId: body.projectId,
            penggunaId: body.penggunaId,
        }
    });
    return NextResponse.json(projectTracking, {status: 201});
}