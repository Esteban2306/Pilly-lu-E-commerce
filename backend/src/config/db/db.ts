import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
    try {
        await mongoose.connect(uri)
        console.log('Base de datos conectada');
    } catch (err) {
        console.error('Error en la conexion: ', err);
        process.exit(1)
    }
}