import React from "react";

function useDebounce(func: Function, value: any, delay: number) {
  React.useEffect(() => {
    const handler = setTimeout(() => {
      func(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [func, value, delay]);
}

export default useDebounce;
