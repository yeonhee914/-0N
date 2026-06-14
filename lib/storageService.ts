import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadFoodImage(uid: string, file: File) {
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.가-힣_-]/g, "_")}`;
  const imageRef = ref(storage, `users/${uid}/foods/${safeName}`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
}
