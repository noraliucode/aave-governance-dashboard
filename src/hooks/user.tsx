import { useState, useEffect } from "react";
import { initOnboard } from "../utils/etherjs";

export const useConnectedUser = () => {
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    initOnboard((address: string | undefined) => {
      if (!address) {
        setUser("");
      } else {
        setUser(address);
      }
    });
  }, []);

  return { user, setUser };
};
