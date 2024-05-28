import React from 'react';
import {useSession} from "next-auth/react";
import Link from "next/link";

const DashboardButton = () => {
    const { data: session} = useSession()

    if (session?.user.role === "admin") {
        return (
            <Link href='/admin'>Dashboard</Link>

        )
    } else {
        return (
            <Link href='/user'>Dashboard</Link>

        )
    }
};

export default DashboardButton;
