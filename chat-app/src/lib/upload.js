import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (file) => {

  if (!file) {
    console.error("No file provided for upload.");
    throw new Error("No file provided for upload.");
  }

  const date = new Date();

  const storageRef = ref(storage, `images/${date + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);       
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(`Upload failed: ${error.message}`);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File uploaded successfully. Download URL:", downloadURL);
          resolve(downloadURL);
        } catch (err) {
          console.error("Failed to get download URL:", err);
          reject(`Failed to get download URL: ${err.message}`);
        }
      }
    );
  });
};

export default upload;
