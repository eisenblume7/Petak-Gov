// components/SideNav.js
import Link from 'next/link';

const SideNav = () => {
    return (
        <div className="sidenav">
            <div className="sidenav-header">
                <h3>Admin Dashboard</h3>
            </div>
            <div className="sidenav-links">
                <Link href="/pages/adminp">
                    Dashboard
                </Link>
                <Link href="/users">
                    Users
                </Link>
                <Link href="./ba">
                    Products
                </Link>
                {/* Add more links as needed */}
            </div>
        </div>
    );
};

export default SideNav;
