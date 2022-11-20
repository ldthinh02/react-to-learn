import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import md5 from "md5";

const hash = md5("reflaunt:password");

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.cookies.content_auth && req.cookies.content_auth === hash) {
      res.status(200).json({});
      return;
    }

    if (req.body) {
      const { username, password } = JSON.parse(req.body);

      if (username === "reflaunt" && password === "RfGanni2022") {
        res.setHeader(
          "Set-Cookie",
          serialize("content_auth", hash, { path: "/" })
        );
        res.end(res.getHeader("Set-Cookie"));
        return;
      }
    }
  }

  res.status(401).json({});
};

export default handler;
