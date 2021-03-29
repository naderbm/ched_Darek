import { useEffect, useRef } from 'react';

export function useDidUpdate(fn, deps) {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      fn();
    }
  }, deps);
  return mounted.current;
}
