import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case 'POST':
      const { address } = req.query;
      res.setHeader("Set-Cookie", [
        `address=${address}; Path=/ ; Secure ; HttpOnly ; SameSite=Strict ; Max-Age=604800 ;`,
      ]);
      res.status(200).json({ message: "success" });
      break;

    default:
      return res.status(400).json({ message: "method not supported" });
  }

}
