import { Request, Response } from 'express';
import { withRLS } from '../utils/dbClient.js';

export const getMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await withRLS(req, async (client) => {
      const result = await client.query('SELECT * FROM medicine_inventory ORDER BY name ASC');
      return result.rows;
    });
    res.json(medicine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch medicine inventory' });
  }
};

export const logVisit = async (req: Request, res: Response) => {
  const { student_id, student_name, reason, treatment, medicines } = req.body; // medicines: [{id, quantity}]
  const logged_by = (req as any).user.id;

  try {
    await withRLS(req, async (client) => {
      // 1. Create visit record
      await client.query(
        'INSERT INTO clinic_visits (student_id, student_name, date, time, reason, treatment, logged_by) VALUES ($1, $2, CURRENT_DATE, TO_CHAR(NOW(), \'HH12:MI AM\'), $3, $4, $5)',
        [student_id, student_name, reason, treatment, logged_by]
      );

      // 2. Deduct stock for each medicine
      if (medicines && Array.isArray(medicines)) {
        for (const med of medicines) {
          const medRes = await client.query('SELECT stock FROM medicine_inventory WHERE id = $1', [med.id]);
          if (medRes.rows.length === 0 || medRes.rows[0].stock < med.quantity) {
            throw new Error(`Insufficient stock for medicine ID: ${med.id}`);
          }
          await client.query(
            'UPDATE medicine_inventory SET stock = stock - $1 WHERE id = $2',
            [med.quantity, med.id]
          );
        }
      }
    });
    res.json({ message: 'Visit logged and stock updated' });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Failed to log visit' });
  }
};

export const getVisits = async (req: Request, res: Response) => {
  try {
    const visits = await withRLS(req, async (client) => {
      const result = await client.query('SELECT * FROM clinic_visits ORDER BY created_at DESC');
      return result.rows;
    });
    res.json(visits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch clinic visits' });
  }
};
