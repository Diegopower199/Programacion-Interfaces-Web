import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export type RemoveEventResponse = {
  removeEvent: {
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  };
};

export type QueryResponse = {
  events: {
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  }[];
};

const RemoveEvent = () => {
  const mutation = gql`
    mutation Mutation($deleteEventId: ID!) {
      deleteEvent(id: $deleteEventId) {
        date
        description
        endHour
        id
        startHour
        title
      }
    }
  `;

  const query = gql`
    query Query {
      events {
        description
        date
        id
        endHour
        startHour
        title
      }
    }
  `;

  const [mutateRemove, setMutateRemove] = useState<boolean>(false);
  const [removeEventMutation, removeEventMutationAnswer] =
    useMutation<RemoveEventResponse>(mutation);
  const queryAnswer = useQuery<QueryResponse>(query, {
    fetchPolicy: "network-only",
  });

  if (removeEventMutationAnswer.loading) {
    <>Loading...</>;
  }

  return (
    <>
      <Link href={"/"}>
        <BotonMenuPrincipal>Ir al menu principal</BotonMenuPrincipal>
      </Link>
      <h1>Remove Event</h1>

      {queryAnswer.error ? (
        <ErrorMessage>{queryAnswer.error.message}</ErrorMessage>
      ) : (
        <>
          {queryAnswer.data?.events.length === 0 ? (
            <>
              <p>No hay ningun evento a partir de la fecha actual</p>
            </>
          ) : (
            <>
              {queryAnswer.data?.events.map((event) => {
                return (
                  <>
                    <DivElementosSlot>
                      <DivElemento>
                        <ParrafoTitulo>Title</ParrafoTitulo>
                        <ParrafoValores>{event.title}</ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>Description</ParrafoTitulo>
                        <ParrafoValores>{event.description}</ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>Date</ParrafoTitulo>
                        <ParrafoValores>
                          {event.date.toString().substring(0, 10)}
                        </ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>Start hour</ParrafoTitulo>
                        <ParrafoValores>{event.startHour}</ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>End hour</ParrafoTitulo>
                        <ParrafoValores>{event.endHour}</ParrafoValores>
                      </DivElemento>

                      <BotonBorrar
                        onClick={async () => {
                          await removeEventMutation({
                            variables: {
                              deleteEventId: event.id,
                            },
                          });
                          await queryAnswer.refetch();
                        }}
                      >
                        <ImagenesIconos
                          src={"/trash.png"}
                          alt={"Esta cargando"}
                        ></ImagenesIconos>
                      </BotonBorrar>
                    </DivElementosSlot>
                  </>
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

export default RemoveEvent;

const DivFormulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  margin: 20px auto;
  width: 50%;
  box-shadow: 0px 0px 10px #aaaaaa;
`;

const DivElementoFormulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 3px;
`;

const InputSubmit = styled.input`
  border: none;
  padding: 10px 20px;
  color: white;
  font-size: 20px;
  background: #1a2537;
  //padding: 15px 20px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s;
  :hover {
    background: cadetblue;
  }
`;

const LabelIdentificar = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #333333;
  font-weight: bold;
  margin: 2px;
`;
const InputValores = styled.input`
  padding: 15px;
  border: 1px solid #aaaaaa;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  //margin-bottom: 20px;
`;

const ParrafoErrores = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  font-size: 20px;
  color: red;
`;

const BotonMenuPrincipal = styled.div`
  border: 1px solid #2e518b; /*anchura, estilo y color borde*/
  padding: 10px; /*espacio alrededor texto*/
  background-color: #2e518b; /*color botón*/
  color: #ffffff; /*color texto*/
  text-decoration: none; /*decoración texto*/
  text-transform: uppercase; /*capitalización texto*/
  font-family: "Helvetica", sans-serif; /*tipografía texto*/
  border-radius: 50px; /*bordes redondos*/

  width: 180px;

  :hover {
    cursor: pointer;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 600px;
`;

export const BotonBorrar = styled.button`
  font-weight: 600;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
`;

const DivElementosSlot = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-around;
  align-items: center;
  flex-direction: row;
  background-color: #424632;
  margin: 5px;
`;

const DivElemento = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: aqua;

  border: black 5px solid;
  height: 81px;
  width: 96px;
`;

const ParrafoTitulo = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  border: black 5px solid;
  width: 91px;
  height: 70px;
  margin: 0px;
  background-color: blueviolet;
`;

const ParrafoValores = styled.p`
  font-family: Arial, sans-serif;
  font-size: 18px;
  color: #333;
  line-height: 1.5em;
  text-align: justify;
  color: #2f2f2f;
  border-radius: 5px;
`;

const ImagenesIconos = styled.img`
  margin: 3px;
  width: 50px;
  height: 60px;
  text-align: center;
  color: #999;
  box-sizing: border-box;
`;
