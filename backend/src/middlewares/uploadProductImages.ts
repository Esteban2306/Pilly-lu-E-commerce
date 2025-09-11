import multer from 'multer'

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 4,
    },
});

export const uploadProductImages = upload.array('images', 4) // en el front debe ir ' name: images' en los componentes que reciben las imagenes 