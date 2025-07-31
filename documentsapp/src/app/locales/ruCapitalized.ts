// src/locales/ru-capitalized.js (или .ts)
import { ru } from 'date-fns/locale';

const customRuLocale = {
  ...ru, // Копируем все из оригинальной русской локали
  localize: {
    ...ru.localize, // Копируем все из оригинального localize
    month: (n: number) => {
      // Массив названий месяцев с заглавной буквы
      const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ];
      return months[n]; // Возвращаем название месяца с заглавной буквы
    },
    // Возможно, вам также потребуется изменить week, day, amPm, era, quarter,
    // если они тоже отображаются с маленькой буквы и вам это не нравится
  },
};

export default customRuLocale;