"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Content() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xl">When will it happen?</p>
      <DatePicker
        dateFormat={"dd/MM/yyyy"}
        minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="text-xl text-center text-white bg-transparent border-b-2 border-white border-solid outline-none"
        placeholderText="Click to select a date"
      />
    </div>
  );
}
