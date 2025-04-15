import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve();
const basePath = path.resolve(__dirname, 'data/json/phimmoi');

router.use((req, res) => {
    const relativePath = req.path.replace(/^\/+/, '');
    const filePath = path.join(basePath, relativePath + '.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Không tìm thấy file:', filePath);
            return res.status(404).json({ error: 'Không tìm thấy phim JSON' });
        }
        try {
            const filmJson = JSON.parse(data);
            res.json(filmJson);
        } catch (parseErr) {
            console.error('❌ JSON.parse lỗi:', parseErr.message);
            res.status(500).json({ error: 'Lỗi phân tích JSON' });
        }
    });
});

export default router;
