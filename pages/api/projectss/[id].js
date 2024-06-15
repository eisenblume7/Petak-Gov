import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
    const { id } = req.query;

    try {
        const project = await prisma.project.findFirst({
            where: {
                id: parseInt(id),
            },
            include: {
                owner: true,
                kategori: true,
                status: true
            }

        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
