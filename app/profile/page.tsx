import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import UpdateForm from "@/components/EditProfile/update";
import {SessionProvider} from "next-auth/react";
import EditProfile from "@/components/EditProfile";


export const metadata: Metadata = {
  title: "Petak Gov SignIn Page ",
  description: "Sign In to Petak Gov",
};

const Update: React.FC = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 right-0 bottom-0 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-white">
        <div className="flex flex-wrap items-center">
            <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default Update;
