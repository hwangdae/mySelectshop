import imageCompression from "browser-image-compression";
import { convertImageToWebp } from "./convertImageToWebp";

const options: Record<
  string,
  { maxSizeMB: number; maxWidthOrHeight: number; useWebWorker: boolean }
> = {
  small: { maxSizeMB: 0.5, maxWidthOrHeight: 600, useWebWorker: true },
  medium: { maxSizeMB: 0.8, maxWidthOrHeight: 1000, useWebWorker: true },
  large: { maxSizeMB: 1, maxWidthOrHeight: 1280, useWebWorker: true },
};

const getCompressionOptions = (size: string) => {
  return options[size];
};

export const imageCompressionFn = async (file: File, size: string) => {
  const options = getCompressionOptions(size);
  const convertedToWebp = await convertImageToWebp(file);
  const compressionFile = await imageCompression(convertedToWebp, options);
  return compressionFile;
};
