import { useState, useCallback } from "react";

type nevZir = [hal: boolean, zirle: () => void];

export default function useZir(ilkHal = false): nevZir {
  const [hal, setZirHalini] = useState(ilkHal);

  const zirle = useCallback(() => {
    setZirHalini((v) => !v);
  }, []);

  return [hal, zirle];
}
