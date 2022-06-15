import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { NEXT_URL } from "../lib/variables";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        checkUser();
    }, []);

    const login = async (username, password) => {
        try {
            await axios.post(NEXT_URL + "/api/login", {
                identifier: username,
                password,
            });
        } catch (err) {
            console.log(err.response.data.message);
        }
        checkUser();
        
    };

    const logout = async () => {
        try {
            await axios.post(NEXT_URL + "/api/logout", {});
        } catch (err) {
            console.log(err.response.data.message);
        }
        checkUser();
    };

    const checkUser = async () => {
        try {
            const { data: userInfo } = await axios.get(NEXT_URL + "/api/user");
            setUser(userInfo);
        } catch (err) {
            setUser(null);
        }
    };

    const authValues = {
        login,
        logout,
        checkUser,
        user,
    };

    return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
}
