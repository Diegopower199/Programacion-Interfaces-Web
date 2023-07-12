import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <DivGeneral>
        <h1>Gestion de calendario</h1>
        <DivBotones>
          <Link href={`/createEvent`} as={`/createEvent`}>
            <BotonEnlaces>Create event</BotonEnlaces>
          </Link>

          <Link href={`/events`} as={`/events`}>
            <BotonEnlaces>Events</BotonEnlaces>
          </Link>

          <Link href={`/updateEvent`} as={`/updateEvent`}>
            <BotonEnlaces>Update event</BotonEnlaces>
          </Link>

          <Link href={`/deleteEvent`} as={`/deleteEvent`}>
            <BotonEnlaces>Delete event</BotonEnlaces>
          </Link>
        </DivBotones>
      </DivGeneral>
    </>
  )
}

const DivGeneral = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DivBotones = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BotonEnlaces = styled.button`
  border: 1px solid #2e518b; /*anchura, estilo y color borde*/
  padding: 10px; /*espacio alrededor texto*/
  background-color: #2e518b; /*color botón*/
  color: #ffffff; /*color texto*/
  text-decoration: none; /*decoración texto*/
  text-transform: uppercase; /*capitalización texto*/
  font-family: "Helvetica", sans-serif; /*tipografía texto*/
  border-radius: 50px; /*bordes redondos*/
  font-size: 40px;
  margin: 20px;

  :hover {
    cursor: pointer;
  }
`;