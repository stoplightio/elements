export const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.replace(/data:.*\/.*;base64,/g, '');
      resolve(base64String);
    };
    reader.onerror = () => reject(reader.error);
  });
