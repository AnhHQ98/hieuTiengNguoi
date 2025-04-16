import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve();
const wordClassPath = path.resolve(__dirname, 'data/json/english/vocabulary/wordClass.json');

router.get('/', (req, res) => {
    fs.readFile(wordClassPath, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Không đọc được file wordClass:', wordClassPath);
            return res.status(500).json({ error: 'Không thể đọc wordClass.json' });
        }
        try {
            const wordClassJson = JSON.parse(data);
            res.json(wordClassJson);
        } catch (parseErr) {
            console.error('❌ JSON.parse lỗi:', parseErr.message);
            res.status(500).json({ error: 'Lỗi phân tích JSON wordClass' });
        }
    });
})

export default router;
