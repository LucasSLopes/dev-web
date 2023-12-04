import cookie from "cookie";

export default async function logout(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("next-auth.session-token", "", {
      maxAge: -1, // Define a data de expiração para o passado
    })
  );
  res.end();
}
