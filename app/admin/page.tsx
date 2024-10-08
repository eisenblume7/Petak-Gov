
import { Metadata } from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import Link from "next/link";
import React from "react";
import {Button} from "reactstrap";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
    title:
        "PetakGOV Admin Dashboard",
    description: "Admin Dashboard",
};

const Home = async () => {
    const session = await getServerSession(authOptions);
    console.log(session?.user.username)

    if (session?.user.role == "admin") {
        return (
            <>
                <DefaultLayout>
                    <ECommerce />
                </DefaultLayout>
            </>
        )
    } else {
        return (
            <div className={"flex items-center justify-center h-screen mb-12 bg-white bg-center bg-cover"}>
                <h2 className={"p-2 text-black text-2xl"}>Forbidden (403)</h2>
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