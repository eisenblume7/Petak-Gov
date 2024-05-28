import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const projects = await prisma.project.findMany();
    return res.json(projects);
}