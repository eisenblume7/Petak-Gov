
import { Metadata } from "next";
import UserLayout from "@/components/Layouts/UserLayout";
import Userdash from "@/components/Dashboard/Userdash";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import Link from "next/link";
import React from "react";
import {Button} from "reactstrap";

export const metadata: Metadata = {
  title:
    "PetakGOV User Dashboard",
  description: "User Dashboard",
};

const Home = async () => {
    const session = await getServerSession(authOptions);
    console.log(session?.user.username)

    if (session?.user.role) {
        return (
            <>
                <UserLayout>
                    <Userdash />
                </UserLayout>
            </>
        )
    } else {
        return (
            <div className={"flex items-center justify-center h-screen mb-12 bg-white bg-center bg-cover"}>
                <h2 className={"p-2 text-black text-2xl"}>Please login to see this page</h2>
                <button>
                    <li className=' text-2xl font-bold flex text-rose-600 p-4 margin-left border-blue-600'>
                        <Link href='/'>Go Back</Link>
                    </li>
                </button>
            </div>
        );
    }
}

export default Home;