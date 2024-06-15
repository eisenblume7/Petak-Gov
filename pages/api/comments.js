import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
    const { projectId } = req.query;

    try {
        const comments = await prisma.comment.findMany({
            where: {
                projectId: parseInt(projectId),
            },
            include: {
                author: true,
            },
        });

        if (!comments) {
            return res.status(404).json({ message: 'Comments not found' });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
