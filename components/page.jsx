import React from "react";
import ReactDOM from "react-dom";
import { PrismaClient } from "@prisma/client";
import AddProduct from "./projects/addProduct";
import DeleteProduct from "./projects/deleteProduct";
import UpdateProduct from "./projects/updateProduct";

import { useEffect, useState } from "react";

const Data = () => {
  const [project, setProject] = useState([]);
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resProject = await prisma.project.findMany({
        select: {
          id: true,
          name: true,
          location: true,
          ownerId: true,
          owner: true,
        },
      });
      const resOwner = await prisma.owner.findMany();

      setProject(resProject);
      setOwner(resOwner);
    };

    fetchData();
  }, []);

  if (!project || !owner) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <div className="mb-2">
          <AddProduct owners={owner} />
        </div>

        <table className="table w-full">
          <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th className="text-center">Actions</th>
          </tr>
          </thead>
          <tbody>
          {project.map((project, index) => (
              <tr key={project.id}>
                <td>{index + 1}</td>
                <td>{project.name}</td>
                <td>{project.location}</td>
                <td>{project.owner.name}</td>
                <td className="flex justify-center space-x-1">
                  <UpdateProduct owners={owner} project={project} />
                  <DeleteProduct project={project} />
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default Data;