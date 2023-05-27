export default function Home() {
  return (
    <>
      {/* <h2>Welcome to Countdown</h2> */}
      <div>
        <p>
          <span className="text-md">How many days until the </span>
          <input
            type="text"
            className="overflow-hidden text-3xl duration-200 bg-transparent border-b-2 outline-none border-slate-400 focus-within:border-blue-500 overflow-ellipsis"
            style={{ width: "fit-content" }}
          />
        </p>
      </div>
    </>
  );
}
