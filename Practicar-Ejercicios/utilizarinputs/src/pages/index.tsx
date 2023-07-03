import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [texto, setTexto] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [hora, setHora] = useState<string>("");
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setTexto(e.target.value);
        }}
      ></input>

      <input
        type="date"
        onChange={(e) => {
          setFecha(e.target.value);
        }}
      ></input>

      <input
        type="time"
        onChange={(e) => {
          setHora(e.target.value);
        }}
      ></input>

      <button
        onClick={(e) => {
          console.log(texto);
        }}
      >
        DALE AL BOTON
      </button>

      <br />
      El valor de texto es: {texto}
      <br/><br/>
      El valor de texto es: {fecha}
      <br/><br/>
      El valor de texto es: {hora}
    </>
  );
}
