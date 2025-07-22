export const truncateText = (text: string | undefined, maxLength: number): string => {
  if (!text) {
    return ''; // Возвращаем пустую строку, если текст не определен
  }

  if (text.length <= maxLength) {
    return text; // Возвращаем текст без изменений, если он уже короче maxLength
  }

  return text.substring(0, maxLength) + '...'; // Обрезаем и добавляем троеточие
};