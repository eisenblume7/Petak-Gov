import { PrismaClient } from "@prisma/client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
const prisma = new PrismaClient();


const getPengguna = async () => {
  const res = await prisma.pengguna.findMany({
    select:{
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updateAt: true,
    }
  });
  return res;
};

const User = async () => {
  const [user] = await Promise.all([getPengguna()]);

  return (
      <DefaultLayout>
        <div className="flex flex-col">
          <table
              className="table rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
            </thead>
            <tbody>
            {user.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt.toString()}</td>
                  <td>{user.updateAt.toString()}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </DefaultLayout>
  );
};

export default User;
