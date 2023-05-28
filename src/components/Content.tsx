"use client";

import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Content() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const dateDifference = useMemo(() => {
    if (!startDate) return;

    const today = new Date();

    let differenceInDays =
      (startDate?.getTime()! - today.getTime()) / 1000 / 60 / 60 / 24;

    let resultContent = [];

    for (let i = 0; i < differenceInDays; i++) {
      resultContent.push(
        <div
          key={i}
          className="text-5xl text-center text-white bg-transparent border-b-2 border-white border-solid outline-none"
        >
          {i}
        </div>
      );
    }

    return resultContent;
  }, [startDate]);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xl">It will happen on</p>
      <DatePicker
        dateFormat={"dd/MM/yyyy"}
        minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="py-2 text-xl text-center text-white bg-transparent border-b-2 border-white border-solid outline-none"
        placeholderText="Click to select a date"
      />
      <div>{dateDifference}</div>
    </div>
  );
}
