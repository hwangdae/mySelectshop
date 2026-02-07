import { uploadImageToCloudinary } from "./uploadImageToCloudinary";

// export const uploadImagesFn = async (files: File[]) => {
//   const imagesString: string[] = [];
//   // if (Math.random() < 1) {
//   //   throw new Error("이미지 업로드 실패");
//   // }
//   if (!files) return;

//   for (const file of files) {
//     try {
//       const files = await uploadImageToCloudinary(file);
//       imagesString.push(files);
//     } catch (error) {
//       alert("이미지 업로드 중 오류가 발생했습니다.");
//       console.error(error);
//       return;
//     }
//   }
//   return imagesString;
// };

// export const uploadImagesFn = async (files: File[]): Promise<string[]> => {
//   if (!files || files.length === 0) return [];

//   try {
//     const results = await Promise.all(
//       files.map((file) => uploadImageToCloudinary(file)),
//     );

//     return results; // string[]
//   } catch (error) {
//     console.error(error);
//     throw new Error("이미지 업로드 중 오류가 발생했습니다.");
//   }
// };

export const uploadImagesFn = async (files: File[]) => {
  if (!files.length) {
    return { images: [], failed: [] };
  }

  const results = await Promise.allSettled(
    files.map((file) => uploadImageToCloudinary(file)),
  );

  const images: string[] = [];
  const failed: File[] = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      images.push(result.value);
    } else {
      failed.push(files[index]);
    }
  });

  return { images, failed };
};
