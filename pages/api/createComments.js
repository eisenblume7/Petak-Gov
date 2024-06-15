// pages/api/createComments.js

import { prisma } from '../../lib/prisma';
import {getServerSession} from "next-auth"; // Ensure you have prisma setup
import {authOptions} from "/lib/auth";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { projectId, text } = req.body;

        if (!projectId || !text) {
            return res.status(400).json({ message: 'Project ID and comment text are required' });
        }

        try {
            const newComment = await prisma.comment.create({
                data: {
                    projectId: parseInt(projectId, 10),
                    text,
                    authorEmail: session.user.email,
                    createdAt: new Date(),
                },
            });

            return res.status(200).json(newComment);
        } catch (error) {
            console.error('Error creating comment:', error);
            return res.status(500).json({ message: 'Error creating comment', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}