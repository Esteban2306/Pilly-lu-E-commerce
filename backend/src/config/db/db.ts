import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
    try {
        await mongoose.connect(uri)
    } catch (err) {
        console.error('Error en la conexion: ', err);
        process.exit(1)
    }
}