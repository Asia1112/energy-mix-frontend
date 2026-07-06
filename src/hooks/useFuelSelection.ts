import { useState } from "react";

export function useFuelSelection() {
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);

  function handleFuelSelect(fuel: string) {
    setSelectedFuels((currentFuels) =>
      currentFuels.includes(fuel)
        ? currentFuels.filter((currentFuel) => currentFuel !== fuel)
        : [...currentFuels, fuel]
    );
  }

  return {
    selectedFuels,
    handleFuelSelect
  };
}
