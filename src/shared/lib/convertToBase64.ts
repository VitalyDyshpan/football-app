export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Проверяем, что результат - строка
      if (typeof reader.result === "string") {
        // Разделяем результат на две части и берем вторую часть (строку Base64)
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      } else {
        reject(
          new Error("Ошибка чтения файла: результат не является строкой.")
        );
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
