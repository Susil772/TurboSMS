import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

    const { username, password } = req.body;

    try {
        // ডাটাবেস পড়া
        const filePath = path.join(process.cwd(), 'users.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const users = JSON.parse(fileData);

        // চেকিং
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            if (user.status === 'active') {
                res.status(200).json({ success: true, token: "session_" + username + "_" + Date.now() });
            } else {
                res.status(401).json({ success: false, message: "Approval Pending!" });
            }
        } else {
            res.status(401).json({ success: false, message: "Wrong Credentials!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "DB Error" });
    }
          }
