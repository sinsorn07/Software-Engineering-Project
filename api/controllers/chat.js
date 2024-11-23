import { db } from '../connect.js';

// Send a message
export const sendMessage = (req, res) => {
  const { userId_sender, eventId, content, fileattachment } = req.body;

  const query = `
    INSERT INTO groupchat (userId_sender, eventId, content, fileattachment) 
    VALUES (?, ?, ?, ?)
  `;

  const values = [userId_sender, eventId, content, fileattachment || null]; // Handle optional fileattachment

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to send message", details: err });
    res.status(200).json({ message: "Message sent", id: result.insertId });
  });
};

// Get messages for a group
export const getMessages = (req, res) => {
  const { eventId } = req.params;

  const query = `
    SELECT * FROM groupchat 
    WHERE eventId = ? 
    ORDER BY timestamp
  `;

  db.query(query, [eventId], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to retrieve messages", details: err });
    res.status(200).json(results);
  });
};
