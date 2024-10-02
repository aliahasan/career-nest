import cloudinary from "./cloudinary.js";
import getDataUri from "./data-uri.js";

// image uploader for profile picture
export const uploadImage = async (file) => {
  const photoUri = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(photoUri.content);
  return cloudResponse.secure_url;
};

// resume uploader
export const uploadResume = async (file) => {
  const fileUri = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
  return {
    resumeUrl: cloudResponse.secure_url,
    resumeName: file.originalname,
  };
};
