// import multer from "multer";

// const storage = multer.memoryStorage();

// export const fileUpload = multer({ storage: storage }).single("file");
import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage: storage }).fields([
  { name: "file", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);
