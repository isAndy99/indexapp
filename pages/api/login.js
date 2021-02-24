import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const KEY = "PRIVATE_JWT_KEY"; // TODO: move to env

const USERS = [
  {
    id: 1,
    username: "admin",
    email: "admin@admin.com",
    password: "$2a$10$e7IIiXNzcjBG3qrMgQHtt.eACExI3ielyd7ICnFGTUS5BVaYaBeBS", // pass
  },
];

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Missing user or password",
      });
    }

    const user = USERS.find((usr) => usr.username === username);
    if (!user) {
      return res.status(401).json({
        error: "Invalid user or password",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        error: "Invalid user or password",
      });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, KEY);

    res.status(200).json({
      token: `Bearer ${token}`,
    });
  }
};
