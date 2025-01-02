import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import authRouter from '../../interface/routes/authRoutes';
import { dbConnection } from '../database/dbConnection';
import userRouter from '../../interface/routes/userRoutes';
import blogRouter from '../../interface/routes/blogRoutes';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}
// database connection call
dbConnection();

app.use(cors(corsOptions));
app.use(express.json())

// different routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT, () => console.log(`server running on port : ${PORT}`));
