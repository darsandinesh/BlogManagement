import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


const uploadImage = (file: any): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        try {
            cloudinary.uploader
                .upload_stream({ folder: "blog" }, (error, result) => {
                    if (error) {
                        console.log("Error in uploading image to Cloudinary:", error);
                        return resolve(null);
                    }
                    if (result) {
                        return resolve(result.url);
                    }
                })
                .end(file.buffer);
        } catch (error) {
            console.log("Unexpected error in uploading image to Cloudinary:", error);
            reject(error);
        }
    });
};




export default uploadImage
