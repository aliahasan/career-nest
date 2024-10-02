import cloudinary from "./cloudinary";
import getDataUri from "./data-uri";

// image uploader for profile picture
const uploadImage = async (file) => {
  const photoUri = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(photoUri.content);
  return cloudResponse.secure_url;
};

// resume uploader
const uploadResume = async (file) => {
  const fileUri = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
  return {
    resumeUrl: cloudResponse.secure_url,
    resumeName: file.originalname,
  };
};
