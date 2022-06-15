import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const { checkUser, user } = useContext(AuthContext);

    return (
        <div>
            <h2>Home Page</h2>
            {user ? <p>Hello {user.username}</p> : <p>Please login</p>}
        </div>
    );
}
