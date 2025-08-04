import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mangodb.js';
import userRouter from './routes/userRouter.js';
import imageRouter from './routes/imageRoutes.js';
dotenv.config();

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
await connectDB()
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    })
