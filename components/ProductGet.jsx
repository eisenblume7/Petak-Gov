import {PrismaClient} from "@prisma/client";

export async function getAllProject(){
    const prisma = new PrismaClient()
    const projects = await prisma.project.findMany()

    return projects

}