import { withRLS } from '../utils/dbClient.js';
export const getBooks = async (req, res) => {
    try {
        const books = await withRLS(req, async (client) => {
            const result = await client.query('SELECT * FROM library_books ORDER BY title ASC');
            return result.rows;
        });
        res.json(books);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};
export const issueBook = async (req, res) => {
    const { book_id, student_id, due_date } = req.body;
    try {
        await withRLS(req, async (client) => {
            // 1. Check availability
            const bookRes = await client.query('SELECT available FROM library_books WHERE id = $1', [book_id]);
            if (bookRes.rows.length === 0 || bookRes.rows[0].available <= 0) {
                throw new Error('Book not available');
            }
            // 2. Create loan record
            await client.query('INSERT INTO library_loans (book_id, student_id, due_date) VALUES ($1, $2, $3)', [book_id, student_id, due_date]);
            // 3. Decrement available count
            await client.query('UPDATE library_books SET available = available - 1 WHERE id = $1', [book_id]);
        });
        res.json({ message: 'Book issued successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message || 'Failed to issue book' });
    }
};
export const returnBook = async (req, res) => {
    const { loan_id } = req.params;
    try {
        await withRLS(req, async (client) => {
            // 1. Get loan details
            const loanRes = await client.query('SELECT * FROM library_loans WHERE id = $1', [loan_id]);
            if (loanRes.rows.length === 0)
                throw new Error('Loan not found');
            const loan = loanRes.rows[0];
            if (loan.returned_at)
                throw new Error('Book already returned');
            const today = new Date();
            const dueDate = new Date(loan.due_date);
            let fine = 0;
            let daysOverdue = 0;
            if (today > dueDate) {
                const diffTime = Math.abs(today.getTime() - dueDate.getTime());
                daysOverdue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                fine = daysOverdue * loan.daily_rate;
            }
            // 2. Update loan record
            await client.query('UPDATE library_loans SET returned_at = CURRENT_DATE, days_overdue = $1, fine_amount = $2 WHERE id = $3', [daysOverdue, fine, loan_id]);
            // 3. Increment available count
            await client.query('UPDATE library_books SET available = available + 1 WHERE id = $1', [loan.book_id]);
        });
        res.json({ message: 'Book returned successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message || 'Failed to return book' });
    }
};
export const getLoans = async (req, res) => {
    try {
        const loans = await withRLS(req, async (client) => {
            const result = await client.query(`
        SELECT l.*, b.title as book_title, s.name as student_name 
        FROM library_loans l
        JOIN library_books b ON l.book_id = b.id
        JOIN students st ON l.student_id = st.id
        JOIN users s ON st.user_id = s.id
        ORDER BY l.borrowed_at DESC
      `);
            return result.rows;
        });
        res.json(loans);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch loans' });
    }
};
