import NextImage from "./Image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductsList() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            const response = await axios.get('/api/project');
            setProjects(response.data);
        }
        fetchProjects();
    }, []);

    return (
        <div className="m-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="border rounded-lg bg-gray-100 hover:shadow-lg shadow-md"
                >
                    <Link href={'/projectDisplay'}>
                            <div className="bg-white">
                                <div className="rounded-t-lg mx-auto">
                                    <NextImage src={project.imageUrl} style={{objectFit: "fill"}} width={575} height={200} />
                                </div>
                            </div>
                            <div className="pl-4 pr-4 pb-4 pt-4 rounded-lg">
                                <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                                    {project.name}
                                </h4>
                                <div className="mt-1 text-sm text-gray-700">
                                    {project.location}
                                </div>
                            </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}