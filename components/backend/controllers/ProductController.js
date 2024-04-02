import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getProduct = async (req, res) => {
    try {
        const response = await prisma.project.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}

export const getProductById = async (req, res) => {
    try {
        const response = await prisma.project.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createProduct = async (req, res) => {
    const {name, location} = req.body;
    try {
        const project = await prisma.project.create({
            data: {
                name: name,
                location: location
            }
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateProduct = async (req, res) => {
    const {name, location} = req.body;
    try {
        const project = await prisma.project.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: name,
                location: location
            }
        });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const project = await prisma.project.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}