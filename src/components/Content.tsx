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

const StyledGridButtonLayout = styled("div")`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  align-items: end;
`;

export default function Content() {
  const [doesLoadData, setDoesLoadData] = useState<boolean>(true);
  const [getFromLocalStorage, setToLocalStorage] = useLocalStorage();

  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [daysCompletedCount, setDaysCompletedCount] = useState<number>(0);

  const daysArray = useMemo(() => {
    if (!endDate || !startDate) return;

    let differenceInDays =
      (endDate?.getTime()! - startDate?.getTime()) / 1000 / 60 / 60 / 24;

    let resultContent = [];

    for (let i = 0; i <= differenceInDays; i++) {
      const date = new Date(startDate.getTime() + 24 * 60 * 60 * 1000 * i);

      resultContent.push(
        <div
          key={i}
          className={`grid text-center border-2 border-white rounded-md place-content-center aspect-square 
          ${i < daysCompletedCount ? "bg-green-500" : "bg-transparent"}`}
        >
          <span className="text-4xl">{date.getDate()}</span>
          <span>{months[date.getMonth()]}</span>
        </div>
      );
    }

    return resultContent;
  }, [endDate, startDate, daysCompletedCount]);

  const startTodayDateDayDifference = useMemo(() => {
    if (!startDate) return 0;
    return Math.floor(
      (new Date().getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24
    );
  }, [startDate]);

  function changeDaysCompletedCount(daysCompletedCount: number) {
    setDaysCompletedCount(daysCompletedCount);
    setToLocalStorage("daysCompletedCount", daysCompletedCount);
  }

  useEffect(() => {
    const storedData = getFromLocalStorage("endDateTime");
    if (storedData) setEndDate(new Date(storedData));
    const daysCount = getFromLocalStorage("daysCompletedCount");
    if (daysCount) setDaysCompletedCount(daysCount);
    const startDate = getFromLocalStorage("startDateTime");
    if (startDate) setStartDate(new Date(startDate));

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
            <div>
              <div>
                <p className="text-xl">It will start from</p>
                <div className="flex flex-col items-center gap-8 mx-auto">
                  <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    maxDate={endDate ? endDate : undefined}
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setToLocalStorage("startDateTime", date?.getTime());
                      setDaysCompletedCount(0);
                    }}
                    className="py-2 text-xl text-center text-white bg-transparent border-b-2 border-white border-solid outline-none"
                    placeholderText="Click to select a date"
                  />
                </div>
              </div>
              <div>
                <p className="text-xl">It will happen on</p>
                <div className="flex flex-col items-center gap-8 mx-auto">
                  <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    minDate={
                      new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                    }
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                      setToLocalStorage("endDateTime", date?.getTime());
                    }}
                    className="py-2 text-xl text-center text-white bg-transparent border-b-2 border-white border-solid outline-none"
                    placeholderText="Click to select a date"
                  />
                </div>
              </div>
            </div>
            <StyledGridButtonLayout>
              <button
                type="button"
                disabled={startTodayDateDayDifference <= daysCompletedCount}
                className={`px-6 py-3 duration-150 bg-transparent border-2 border-solid rounded-lg hover:bg-slate-700 border-slate-300
                ${
                  startTodayDateDayDifference > daysCompletedCount
                    ? "opacity-100"
                    : "opacity-100 pointer-events-none"
                }}`}
                onClick={() => {
                  changeDaysCompletedCount(startTodayDateDayDifference);
                }}
              >
                Check all to this day
              </button>
              <button
                onClick={() => {
                  setDaysCompletedCount(daysCompletedCount + 1);
                }}
                className="flex items-center gap-2 px-8 py-4 duration-150 bg-blue-500 rounded-md hover:bg-blue-700 active:scale-90"
              >
                Check another day <BsCheckLg className="text-xl" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (daysCompletedCount > 0)
                    setDaysCompletedCount(daysCompletedCount - 1);
                }}
                className="grid w-8 duration-150 bg-transparent border-2 border-solid rounded-lg hover:bg-slate-700 aspect-square border-slate-300 place-content-center"
              >
                <span>-</span>
              </button>
            </StyledGridButtonLayout>
          </div>
          <div className="grid w-full grid-cols-8 gap-2 px-6">{daysArray}</div>
        </>
      )}
    </>
  );
}
