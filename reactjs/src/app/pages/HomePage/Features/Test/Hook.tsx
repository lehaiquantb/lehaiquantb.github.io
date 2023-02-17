import { useEffect, useRef, useState } from 'react';

export default function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>();
  debugger;

  useEffect(() => {
    debugger;

    ref.current = state;
  });
  debugger;
  return ref.current;
}

export const Hook = () => {
  const [count, setCount] = useState(0);
  debugger;

  const prevCount = usePrevious(count);

  debugger;
  return (
    <p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <p>
        Now: {count}, before: {prevCount}
      </p>
    </p>
  );
};
