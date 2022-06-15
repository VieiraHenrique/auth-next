import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const { login, user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
        router.push("/");
    };

    return (
        <div>
            <h2>Login</h2>

            {!user ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button>Login</button>
                </form>
            ) : (
                <p>You are already logged in</p>
            )}
        </div>
    );
}
