import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Layout({ children }) {
    const { logout, user } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <header>
                <Link href={"/"}>
                    <h1>myBlog</h1>
                </Link>
                <ul>
                    {!user ? (
                        <li>
                            <Link href={"/login"}>Login</Link>
                        </li>
                    ) : (
                        <li onClick={handleLogout}>Logout</li>
                    )}
                </ul>
            </header>

            <hr />

            {children}

            <hr />

            <footer>
                <p>@Copyright 2022.</p>
            </footer>
        </>
    );
}
