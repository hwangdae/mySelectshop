import { uploadImage } from "./uploadImage";

export const uploadImagesFn = async (files: File[]) => {
  const imagesString: string[] = [];

  if (files && files.length > 0) {
    for (const file of files) {
      try {
        const files = await uploadImage(file);
        imagesString.push(files);
      } catch (error) {
        alert("이미지 업로드 중 오류가 발생했습니다.");
        console.error(error);
        return;
      }
    }
  }
  return imagesString;
};
