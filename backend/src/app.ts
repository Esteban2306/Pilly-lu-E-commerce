import express from "express";
import path from "node:path";
import userRouter from '../src/routes/user.routes'
import productRouter from '../src/routes/product.routes'
import cartRouter from '../src/routes/cart.routes'
import orderRouter from '../src/routes/order.routes'
import categoryRoter from '../src/routes/category.routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();
app.disable('x-powered-by');

app.use(cors())
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