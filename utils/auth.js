const jwt = require("jsonwebtoken");
const secret_key = "mern-stack";

const auth = async (req, res, next) => {
  if (req.method === "GET") {
    return next();
  }
  // const token = await req.headers.authorization.split(" ")[1];
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNjc2MjY2MzI3LCJleHAiOjE2NzYzNDkxMjd9.GOKo-VFx_W2I5Rku4rYhKxN27nVpbThwMpUz6m_NKNg";

  if (!token) {
    return res.status(400).json({ message: "Cannot find token" });
  }

  try {
    const decoded = jwt.verify(token, secret_key);
    req.body.email = decoded.email;
    return next();
  } catch (error) {
    return res.status(400).json({ message: "Please re login" });
  }
};

module.exports = auth;
