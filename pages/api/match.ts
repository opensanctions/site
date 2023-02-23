import { NextApiRequest, NextApiResponse } from "next";
import { postMatch } from "../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      throw new Error("POST requests only")
    }
    const { dataset, ...query } = JSON.parse(req.body);
    const data = await postMatch(query, dataset || 'default');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err + '' });
  }
};