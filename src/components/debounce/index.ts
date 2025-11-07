import { useCallback, useRef } from 'react';
const useDebounce = (callback:any, delay = 300) => {
    
  const timeoutRef = useRef<any>(null);

  const debouncedCallback = useCallback(
    (...args:any) => {

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};

export default useDebounce;