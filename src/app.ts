import express from 'express';
import 'reflect-metadata';
import './config/data-source';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Student Blog :)')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})