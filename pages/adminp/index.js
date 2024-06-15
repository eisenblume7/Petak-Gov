// pages/dashboard/index.js
import Sidenav from "../../components/SideNav"
import Project from "../../app/admin/projects/page"

const Admin = () => {

    return (
        <div className="dashboard">
            <Sidenav />
            <div className="main-content">
                <Project />
            </div>
        </div>
    );
};

export default Admin;
