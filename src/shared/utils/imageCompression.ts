import imageCompression from "browser-image-compression";
// import { convertImageToWebp } from "./convertImageToWebp";

type ImageSize = "small" | "medium" | "large";

const options: Record<
  ImageSize,
  { maxSizeMB: number; maxWidthOrHeight: number; useWebWorker: boolean }
> = {
  small: { maxSizeMB: 0.7, maxWidthOrHeight: 1000, useWebWorker: true },
  medium: { maxSizeMB: 0.8, maxWidthOrHeight: 1000, useWebWorker: true },
  large: { maxSizeMB: 1, maxWidthOrHeight: 1280, useWebWorker: true },
};

const getCompressionOptions = (size: ImageSize) => {
  return options[size];
};

export const imageCompressionFn = async (file: File, size: ImageSize) => {
  const options = getCompressionOptions(size);
  // const convertedToWebp = await convertImageToWebp(file);
  // const compressionFile = await imageCompression(convertedToWebp, options);

  const compressionFile = await imageCompression(file, options);

  return compressionFile;
};
