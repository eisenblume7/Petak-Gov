import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
import React from "react";

const prisma = new PrismaClient();

const getProject = async () => {
  const res = await prisma.project.findMany({
    select:{
      id: true,
      name: true,
      location: true,
      ownerId: true,
      owner: true,
    }
  });
  return res;
};

const getOwner = async () => {
  const res = await prisma.owner.findMany();
  return res;
};

const Project = async () => {
  const [project, owner] = await Promise.all([getProject(), getOwner()]);

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

export default Project;
