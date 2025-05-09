import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve();
const englishWordAppearancePath = path.resolve(__dirname, 'data/json/english/vocabulary/englishWordAppearance.json');

router.get('/', (req, res) => {
    fs.readFile(englishWordAppearancePath, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Không đọc được file englishWordAppearance:', englishWordAppearancePath);
            return res.status(500).json({ error: 'Không thể đọc englishWordAppearance.json' });
        }
        try {
            const englishWordAppearanceJson = JSON.parse(data);
            res.json(englishWordAppearanceJson);
        } catch (parseErr) {
            console.error('❌ JSON.parse lỗi:', parseErr.message);
            res.status(500).json({ error: 'Lỗi phân tích JSON englishWordAppearance' });
        }
    });
});

export default router;
