import cookie from "cookie";

export default async function handleLogout(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Only POST method is allowed" });
        return;
    }

    // Set cookie with JWT

    const JWTcookie = cookie.serialize("token", "", {
        path: "/",
        httpOnly: true,
        maxAge: new Date(0),
    });

    res.setHeader("Set-Cookie", JWTcookie);

    res.status(200).json({ message: "Cookie destroyed" });
    return;
}
