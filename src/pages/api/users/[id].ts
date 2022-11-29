import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '../../../dummyData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res
      .status(200)
      .json(users.find((user) => user.id === Number(req.query['id'])));
  }
}
