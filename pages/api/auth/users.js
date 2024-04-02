// pages/api/users.js
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const users = await prisma.user.findMany();
        res.json(users);
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
