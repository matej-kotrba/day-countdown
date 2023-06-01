"use client";

import { useState, useMemo, useEffect } from "react";
import DatePicker from "react-datepicker";
import { BsCheckLg } from "react-icons/bs";
import useLocalStorage from "~/hooks/useLocalStorage";
import Loader from "./Loader";
import styled from "@emotion/styled";

import "react-datepicker/dist/react-datepicker.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septemper",
  "October",
  "November",
  "December",
];

const StyledDateDiv = styled("div")``;

export default function Content() {
  const [doesLoadData, setDoesLoadData] = useState<boolean>(true);
  const [getFromLocalStorage, setToLocalStorage] = useLocalStorage();

  const [endDate, setEndDate] = useState<Date | null>(null);
  const [daysCompletedCount, setDaysCompletedCount] = useState<number>(0);

  const daysArray = useMemo(() => {
    if (!endDate) return;

    const today = new Date();

    let differenceInDays =
      (endDate?.getTime()! - today.getTime()) / 1000 / 60 / 60 / 24;

    let resultContent = [];

    for (let i = 0; i < differenceInDays; i++) {
      const date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * i);

      resultContent.push(
        <div
          key={i}
          className={`grid text-center bg-transparent border-2 border-white rounded-md place-content-center aspect-square 
          ${i < daysCompletedCount ? "bg-green-500" : ""}`}
        >
          <span className="text-4xl">{date.getDate()}</span>
          <span>{months[date.getMonth()]}</span>
        </div>
      );
    }

    return resultContent;
  }, [endDate, daysCompletedCount]);

  useEffect(() => {
    const storedData = getFromLocalStorage("endDateTime");
    if (storedData) setEndDate(new Date(getFromLocalStorage("endDateTime")));
    const daysCount = getFromLocalStorage("daysCompletedCount");
    if (daysCount) setDaysCompletedCount(daysCount);

    setDoesLoadData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {doesLoadData ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col items-center w-full gap-4">
            <p className="text-xl">It will happen on</p>
            <div className="flex flex-col items-center gap-8 mx-auto">
              <DatePicker
                dateFormat={"dd/MM/yyyy"}
                minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setToLocalStorage("endDateTime", date?.getTime());
                }}
                className="py-2 text-xl text-center text-white bg-transparent border-b-2 border-white border-solid outline-none"
                placeholderText="Click to select a date"
              />
            </div>
            <button
              onClick={() => {
                setToLocalStorage("daysCompletedCount", daysCompletedCount + 1);
                setDaysCompletedCount((old) => old + 1);
              }}
              className="flex items-center gap-2 px-8 py-4 duration-150 bg-blue-500 rounded-md hover:bg-blue-700 active:scale-90"
            >
              Check another day <BsCheckLg className="text-xl" />
            </button>
          </div>
          <div className="grid w-full grid-cols-8 gap-2 px-6">{daysArray}</div>
        </>
      )}
    </>
  );
}
