import express from 'express';
import 'reflect-metadata';
import './config/data-source';
import routes from './shared/routes/routes';

const app = express();
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Student Blog :)')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})