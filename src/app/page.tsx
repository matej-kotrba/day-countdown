"use client";

import Content from "~/components/Content";
import useLocalStorage from "~/hooks/useLocalStorage";

export default function Home() {
  const [getLocalStorage, setLocalStorage] = useLocalStorage();

  return (
    <>
      {/* <h2>Welcome to Countdown</h2> */}
      <div className="flex flex-col items-center justify-center gap-10">
        <p>
          <span className="text-md">How many days until the </span>
          <input
            type="text"
            defaultValue={getLocalStorage("title") || ""}
            className="overflow-hidden text-3xl duration-200 bg-transparent border-b-2 outline-none border-slate-400 focus-within:border-blue-500 overflow-ellipsis"
            style={{ width: "fit-content" }}
            onChange={(e) => {
              setLocalStorage("title", e.target.value);
            }}
          />
        </p>
        <Content />
      </div>
    </>
  );
}
