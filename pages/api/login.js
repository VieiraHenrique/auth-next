import axios from "axios";
import { CMS_URL } from "../../lib/variables";
import cookie from "cookie";

export default async function handleLogin(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Only POST method is allowed" });
        return;
    }
    if (!req.body.hasOwnProperty("identifier") || !req.body.hasOwnProperty("password")) {
        res.status(400).json({ message: "Request must contain a body with identifier and password" });
        return;
    }

    
    try {
        const { identifier, password } = req.body;
        const { data: strapiRes } = await axios.post(CMS_URL + "/auth/local", {
            identifier,
            password,
        });

        // Set cookie with JWT

        const JWTcookie = cookie.serialize("token", strapiRes.jwt, {
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
        });

        res.setHeader("Set-Cookie", JWTcookie);

        res.status(200).json(strapiRes.user);
        return;
    } catch (err) {
        res.status(403).json({ message: err.response.data.error.message });
        return;
    }
}
