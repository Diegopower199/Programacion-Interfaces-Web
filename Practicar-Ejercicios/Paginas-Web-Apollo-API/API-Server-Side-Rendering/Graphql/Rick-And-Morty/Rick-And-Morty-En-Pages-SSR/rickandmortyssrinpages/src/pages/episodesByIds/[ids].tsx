import getApolloClient from "@/libs/client";
import { CharacterAPI } from "@/types";
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import styled from 'styled-components';


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ids } = context.query;
  console.log(ids)
  const query = gql`
  query episodesByIds($ids: [ID!]!){
    episodesByIds(ids: $ids) {
      id
      name
      air_date
      episode
      created
    }
  }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
      episodesByIds: {
        id: string;
        name: string;
        air_date: string;
        episode: string;
      }[];
  }>({
    query,
    variables: {
      ids: ids,
    },
  });

  return {
    props: {
      data: data.episodesByIds
    },
  };
};

const EpisodePorIds: NextPage<{ data: { id: string; name: string; air_date: string; episode: string; }[]}> = (props: { data: {  id: string; name: string; air_date: string; episode: string; }[] }) => {
  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <TituloH1>Informacion de los episodios</TituloH1>
      {props.data.map( (episode) => (
        <>
          <h1>{episode.name}</h1>
        </>
      ))}
    </>
  );
};

export default EpisodePorIds;

const TituloH1 = styled.h1`
    display: flex;
    justify-content: center;
`

const DivInformacionEpisodio = styled.div`
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;

    background-color: green;
`

const DivInformacionEspecifica = styled.div`
    display: flex;
    justify-content: flex-start;

    flex-direction: column;
`

const ParrafoDescripcion = styled.p`
    font: bold 100% monospace;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: white;
    font-size: 20px;
    text-decoration: none;
`