import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import { GET_AVAILABLE_SLOTS } from "@/queries";
import SlotsViewer from "@/Components/SlotsViewer";

export type Fecha = {
  day: number;
  month: number;
  year: number;
};

const PatientSlots: FC = () => {
    const [dniString, setDni] = React.useState<string>("");
  const [date, setDate] = React.useState<Fecha>({
    day: new Date().getDay(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const { data, loading, error, refetch } = useQuery(GET_AVAILABLE_SLOTS, {
    variables: {
      day: date.day,
      month: date.month,
      year: date.year,
    },
    fetchPolicy: "network-only",
  });
  if (loading) return <>Loading...</>;
  if (error) return <>Error {error.toString()}</>;

  const dateString = `${date.year}-${(date.month + 1).toLocaleString("es-ES", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}-${date.day.toLocaleString("es-ES", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
  console.log(dateString);
  return (
    <>
      Selecciona una fecha:{" "}
      <input
        value={dateString}
        type="date"
        onChange={(e) => {
          console.log("date: ", e.target.value);
          const date: string = e.target.value; // YYYY-MM-DD
          let [year, month, day] = date.split("-");
          month = (parseInt(month) - 1).toString();
          console.log(year, month, day);

          setDate({
            day: parseInt(day),
            month: parseInt(month),
            year: parseInt(year),
          });
        }}
      />
      <input
        type="text"
        value={dniString}
        onChange={(e) => { setDni (e.target.value); }
        }
        />
      <SlotsViewer
        day={date.day}
        month={date.month}
        year={date.year}
        dni={dniString}
        slots={data.availableSlots}
        doctor={false}
        add={false}
        refetch={refetch}
      />
    </>
  );
};

export default PatientSlots;