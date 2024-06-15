import { PrismaClient } from "@prisma/client";
import CategoryButtons from "../../components/CategoryButtons";
import NextImage from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
const prisma = new PrismaClient();

const getProject = async (id) => {
    const res = await prisma.project.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            location: true,
            kategori: true,
            owner: true,
            status: true,
            imageUrl: true,
            description: true,
        },
    });
    return res;
};

const getOwner = async () => {
    const res = await prisma.owner.findMany();
    return res;
};

const getKategori = async () => {
    const res = await prisma.kategori.findMany();
    return res;
};

const getStatus = async () => {
    const res = await prisma.status.findMany();
    return res;
};

const ProjectDetail = ({ id }) => {
    const [project, setProject] = useState(null);
    const [owner, kategori, status] = useEffect(() => [getOwner(), getKategori(), getStatus()], []);

    useEffect(() => {
        async function fetchProject() {
            const response = await getProject(id);
            setProject(response);
        }
        fetchProject();
    }, [id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center mb-12 bg-center bg-cover bg-primary/20">
            <div className="absolute top-20 left-20 right-20">
                <CategoryButtons />
                <div className="m-6">
                    <h1 className="text-3xl font-bold">{project.name}</h1>
                    <div className="mt-1 flex flex-wrap mb-4">
                        <NextImage src={project.imageUrl} style={{ objectFit: "fill" }} width={575} height={200} />
                    </div>
                    <div className="pl-4 pr-4 pb-4 pt-4 rounded-lg">
                        <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                            Lokasi = {project.location.name}
                        </h4>

                        <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                            Kategori = {project.kategori.name}
                        </h4>

                        <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                            Pemilik Proyek = {project.owner.name}
                        </h4>

                        <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                            Status = {project.status.name}
                        </h4>

                        <p className="mt-1 text-sm text-gray-700">{project.description}</p>
                    </div>
                    <Link href="/projectDisplay">
                        <div className="text-blue-600 hover:text-blue-900">Back to projects list</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;