import Link from "next/link";

import {SessionProvider} from "next-auth/react";
import UpdateForm from "@/components/EditProfile/update";

const EditProfile = (props: {}) => {

    return (
        <SessionProvider>
            <div>
                <UpdateForm/>
            </div>
        </SessionProvider>
    );
};

export default EditProfile;
