// src/shared/lib/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

/**
 * Хук для дебаунсинга значения.
 * @param value Значение, которое нужно дебаунсить.
 * @param delay Задержка в миллисекундах.
 * @returns Дебаунсенное значение.
 */

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;