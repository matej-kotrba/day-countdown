export default function useLocalStorage() {
  function getFromLocalStorage(key: string) {
    if (typeof window === "undefined") return;
    const item = localStorage.getItem(key);
    if (!item) return;
    return JSON.parse(item);
  }

  function setToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [getFromLocalStorage, setToLocalStorage] as const;
}
