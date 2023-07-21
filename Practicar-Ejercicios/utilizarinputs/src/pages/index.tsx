import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [texto, setTexto] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [hora, setHora] = useState<string>("");
  const [valueSelect, setValueSelect] = useState<string>("primera opcion");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [textValue, setTextValue] = useState<string>("");
  const [rangeValue, setRangeValue] = useState<number>(50);

  return (
    <>
      Text:{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          background: "green",
          margin: "20px",
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            setTexto(e.target.value);
          }}
        ></input>
      </div>
      Date:{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          background: "green",
          margin: "20px",
        }}
      >
        <input
          type="date"
          onChange={(e) => {
            setFecha(e.target.value);
          }}
        ></input>
      </div>
      Time:{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          background: "green",
          margin: "20px",
        }}
      >
        <input
          type="time"
          onChange={(e) => {
            setHora(e.target.value);
          }}
        ></input>
      </div>
      Dar al boton:{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          background: "green",
          margin: "20px",
        }}
      >
        <button
          onClick={(e) => {
            console.log(texto);
          }}
        >
          DALE AL BOTON
        </button>
        <br />
        El valor de texto es: {texto}
        <br />
        <br />
        El valor de texto es: {fecha}
        <br />
        <br />
        El valor de texto es: {hora}
        <br />
        <br />
        <br />
      </div>
      Options:{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          background: "green",
          margin: "20px",
        }}
      >
        <select
          value={valueSelect}
          onChange={(e) => {
            setValueSelect(e.target.value);
            console.log(valueSelect);
          }}
        >
          <option value="primera opcion">primera opcion</option>
          <option value="segunda opcion">segunda opcion</option>
          <option value="tercera opcion">tercera opcion</option>
          <option value="cuarta opcion">cuarta opcion</option>
        </select>
        <p>Value select: {" " + valueSelect} </p>
      </div>
      Checkbox:{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          background: "green",
          margin: "20px",
        }}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
          }}
        />
        <p>Estado del checkbox: {isChecked ? "Marcado" : "Desmarcado"}</p>
      </div>
      Opcion elegida:{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          background: "green",
          margin: "20px",
        }}
      >
        <label>
          <input
            type="radio"
            value="opcion1"
            checked={selectedOption === "opcion1"}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          />
          Opción 1
        </label>
        <label>
          <input
            type="radio"
            value="opcion2"
            checked={selectedOption === "opcion2"}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          />
          Opción 2
        </label>
        <label>
          <input
            type="radio"
            value="opcion3"
            checked={selectedOption === "opcion3"}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          />
          Opción 3
        </label>
        <p>Opción seleccionada: {selectedOption}</p>
      </div>
      TextArea:{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          background: "green",
          margin: "20px",
        }}
      >
        <textarea
          value={textValue}
          onChange={(e) => {
            setTextValue(e.target.value);
          }}
        />
        <p>Texto ingresado: {textValue}</p>
      </div>
      Range:{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          background: "green",
          margin: "20px",
        }}
      >
        <input
          type="range"
          min="0"
          max="100"
          value={rangeValue}
          onChange={(e) => {
            setRangeValue(Number(e.target.value));
          }}
        />
        <p>Valor del rango: {rangeValue}</p>
      </div>
    </>
  );
}
