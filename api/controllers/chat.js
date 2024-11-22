
const db = require('../connect');

// Send a message
exports.sendMessage = (req, res) => {
  const { sender_id, group_id, message } = req.body;

  const query = 'INSERT INTO messages (sender_id, group_id, message) VALUES (?, ?, ?)';
  db.query(query, [sender_id, group_id, message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ message: 'Message sent', id: result.insertId });
  });
};

// Get messages for a group
exports.getMessages = (req, res) => {
  const group_id = req.params.groupId;

  const query = 'SELECT * FROM messages WHERE group_id = ? ORDER BY timestamp';
  db.query(query, [group_id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};
