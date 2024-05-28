import { PrismaClient } from "@prisma/client";
import DeleteFav from "./deleteFav";
import UserLayout from "@/components/Layouts/UserLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
const prisma = new PrismaClient();


const getProjectTracking = async () => {
  const res = await prisma.projectTracking.findMany({
    select:{
      id: true,
      projectId: true,
      Project: true,
      penggunaId: true,
      Pengguna: true,
    }
  });
  return res;
};

const getProject = async () => {
  const res = await prisma.project.findMany();
  return res;
};

const getPengguna = async () => {
  const res = await prisma.pengguna.findMany();
  return res;
};

const Project = async () => {
  const [projectTracking, project, pengguna, status] = await Promise.all([getProject(), getOwner(), getKategori(), getStatus()]);

  return (
      <UserLayout>
        <div className="flex flex-col">

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
      </UserLayout>
  );
};

export default Project;
