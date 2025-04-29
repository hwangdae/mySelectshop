export const convertImageToWebp = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const webpFile = new File([blob], `${file.name.split(".")[0]}.webp`, {
            type: "image/webp",
            lastModified: Date.now(),
          });
          resolve(webpFile);
        } else {
          reject(new Error("Image conversion failed"));
        }
      }, "image/webp");
    };
    img.onerror = () => reject(new Error("Image load failed"));
  });
};
