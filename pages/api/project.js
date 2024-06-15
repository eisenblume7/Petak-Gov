import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const projects = await prisma.project.findMany({
        select:{
            id: true,
            name: true,
            location: true,
            imageUrl: true,
            kategori: true,
            ownerId: true,
            owner: true,
            status: true,
        }
    });
    return res.json(projects);
}