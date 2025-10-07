import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function usePreviousLoacation() {
  const router = useRouter();
  const [prevLocation, setPrevLocation] = useState<string | null>(null);

  useEffect(() => {
    return router.subscribe("onResolved", ({ fromLocation }) => {
      setPrevLocation(fromLocation?.href ?? "/");
    });
  }, []);

  return prevLocation;
}
