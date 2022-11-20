import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setPreviewData(
    {},
    {
      maxAge: 60, // The preview mode cookies expire in 1 minutes
    }
  );
  res.redirect(req.query.slug as string);
};

export default handler;
