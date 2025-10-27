import express from "express";
import path from "node:path";
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'
import categoryRoter from './routes/category.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.disable('x-powered-by');

app.use(cors({
    origin: ['http://localhost:3000', 'https://pilly-lu-e-commerce.vercel.app', 'https://pillylu.qzz.io'],
    credentials: true
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());



app.use('/users', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/category', categoryRoter);


app.use((req, res) => {
    res.status(404).json({ message: "Recurso no encontrado" });
});

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Error interno del servidor",
    });
});

export default app