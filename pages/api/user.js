import axios from "axios";
import cookie from "cookie";
import { CMS_URL } from "../../lib/variables";

export default async function handleUser(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Only GET method is allowed" });
        return;
    }

    try {
        const { token } = cookie.parse(req.headers.cookie);

        const { data: strapiRes } = await axios.get(CMS_URL + "/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        res.status(200).json(strapiRes);
    } catch (err) {
        res.status(401).json({ message: "No user is logged in" });
    }
}
