import { useEffect, useState } from "react";
import {
  defaultPortfolioData,
  loadPortfolioData,
  resetPortfolioData,
  savePortfolioData,
  type PortfolioData,
} from "./portfolio-data";

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(() => {
    return typeof window !== "undefined" ? loadPortfolioData() : defaultPortfolioData;
  });

  useEffect(() => {
    // Initial sync
    setData(loadPortfolioData());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      } else {
        setData(loadPortfolioData());
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "portfolio_custom_data_v1" || !e.key) {
        setData(loadPortfolioData());
      }
    };

    window.addEventListener("portfolio-data-updated", handleUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("portfolio-data-updated", handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const updateAndSave = (newData: PortfolioData) => {
    setData(newData);
    savePortfolioData(newData);
  };

  const resetAndSave = () => {
    setData(defaultPortfolioData);
    resetPortfolioData();
  };

  return {
    data,
    setData,
    updateAndSave,
    resetAndSave,
    defaultData: defaultPortfolioData,
  };
}
