export const uploadImageToCloudinary = async (image: File): Promise<string> => {
  if (image.name.includes("fail")) {
    throw new Error("의도적인 이미지 업로드 실패");
  }
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  const formData = new FormData();

  formData.append("file", image);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  );

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data.url;
};
