import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
const prisma = new PrismaClient();


const getProject = async () => {
  const res = await prisma.project.findMany({
    select:{
      id: true,
      name: true,
      location: true,
      kategori: true,
      ownerId: true,
      kategoriId: true,
      statusId: true,
      owner: true,
      status: true,
    }
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

const Project = async () => {
  const [project, owner, kategori, status] = await Promise.all([getProject(), getOwner(), getKategori(), getStatus()]);


  // @ts-ignore
  return (
      <DefaultLayout>
        <div className="flex flex-col">
          <div
              className="mb-2 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark ">
            <AddProduct owners={owner} kategories={kategori} statuses={status}/>
          </div>

          <table
              className="table rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark ">
            <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Location</th>
              <th>Kategori</th>
              <th>Owner</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {project.map((project, index) => (
                <tr key={project.id}>
                  <td>{index + 1}</td>
                  <td>{project.name}</td>
                  <td>{project.location}</td>
                  <td>{project.kategori.name}</td>
                  <td>{project.owner.name}</td>
                  <td>{project.status.name}</td>
                  <td className = "flex justify-center">
                    <UpdateProduct owners={owner} kategories={kategori} statuses={status} project={project}/>
                    <DeleteProduct project={project}/>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </DefaultLayout>
  );
};

export default Project;
