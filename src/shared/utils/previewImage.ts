export const previewImage = (
  file: File,
  setImagePreview: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImagePreview(reader.result);
  };
};
