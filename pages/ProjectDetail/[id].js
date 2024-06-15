import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import NextImage from "next/image";
import CategoryButtons from "../../components/CategoryButtons";
import ProductsList from "../../components/ProductsList";
import Comments from "../../components/comments";
import FormComment from "../../components/form-comments";

export default function ProjectDetail({ id }) {
    const [project, setProject] = useState({});

    useEffect(() => {
        async function fetchProject() {
            const response = await axios.get(`/api/projectss/${id}`);
            setProject(response.data);
        }
        fetchProject();
    }, [id]);

    return (
        <div className="py-16 flex items-center justify-center mb-12 bg-center bg-cover">
            <div className="container mx-auto px-4">
                <CategoryButtons/>
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-16 relative">
                    <h1 className="text-4xl font-bold text-black text-center mb-6">{project.name}</h1>
                    <div className="mb-6 flex justify-center">
                        <NextImage src={project.imageUrl} alt="Project Image" style={{objectFit: "cover"}} width={600}
                                   height={300} className="rounded-lg shadow-md"/>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <h4 className="text-lg font-semibold text-black">Lokasi: <span
                                className="font-normal">{project.location}</span></h4>
                            <h4 className="text-lg font-semibold text-black">Kategori: <span
                                className="font-normal">{project.kategori?.name}</span></h4>
                            <h4 className="text-lg font-semibold text-black">Pemilik Proyek: <span
                                className="font-normal">{project.owner?.name}</span></h4>
                            <h4 className="text-lg font-semibold text-black">Status: <span
                                className="font-normal">{project.status?.name}</span></h4>
                        </div>
                        <Link href="/projectDisplay"
                              className="block text-blue-600 hover:text-blue-900 text-center mt-4">Back to projects
                            list</Link>
                        <div className="mt-8">
                            <Comments projectId={id}/>
                            <FormComment projectId={id}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export async function getServerSideProps({params}) {
    return {
        props: {
            id: (params.id),
        },
    };
}