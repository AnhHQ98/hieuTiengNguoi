import express from 'express';
import cors from 'cors';
import filmRoutes from './routes/filmRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/phimmoi', filmRoutes);

app.get('/', (req, res) => { res.send('✅ Backend đang hoạt động!') });

const PORT = 1025;
app.listen(PORT, () => {console.log(`🚀 Server chạy tại http://localhost:${PORT}`)})
