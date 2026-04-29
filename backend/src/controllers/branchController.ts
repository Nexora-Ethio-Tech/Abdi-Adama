import { Request, Response } from 'express';
import { withRLS } from '../utils/dbClient.js';

export const getBranches = async (req: Request, res: Response) => {
  try {
    const rows = await withRLS(req, async (client) => {
      const result = await client.query('SELECT * FROM branches ORDER BY name ASC');
      return result.rows;
    });
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch branches' });
  }
};

export const getBranchById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const branch = await withRLS(req, async (client) => {
      const result = await client.query('SELECT * FROM branches WHERE id = $1', [id]);
      return result.rows[0] || null;
    });

    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.json(branch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch branch' });
  }
};
