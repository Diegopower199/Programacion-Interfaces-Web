import getApolloClient from "@/libs/client";
import { CharacterAPI } from "@/types";
import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page } = context.query;
  const query = gql`
    query episodes($page: Int!) {
      episodes(page: $page) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          air_date
          episode
        }
      }
    }
  `;

  const client = getApolloClient();

  const { data } = await client.query<{
    episodes: {
      info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
      };
      results: {
        id: string;
        name: string;
        air_date: string;
        episode: string;
      }[];
    };
  }>({
    query,
    variables: {
      page: Number(page),
    },
  });

  return {
    props: {
      data: data.episodes,
      page: Number(page),
    },
  };
};

const EpisodesPaginados: NextPage<{ data: { info: { count: number; pages: number; next: string | null; prev: string | null;}; results: { id: string; name: string; air_date: string; episode: string }[]}, page: number;
}> = (props: {
  data: {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: { id: string; name: string; air_date: string; episode: string }[];},  page: number;
}) => {
  const paginasTotales: number = props.data.info.count;

  console.log("PAGE: ", props.page);
  console.log("PREV: ", props.data.info.prev, "\nNEXT: ", props.data.info.next)

  return (
    <>
      <Link href={"/"}>Menu principal</Link>
      <h1>Episodes paginados</h1>

      {props.data.results.map((episode) => {
        return (
          <>
            <p>Id: {episode.id}</p>
            

          </>
        );
      })}

      <BotonPaginas>
        <BotonClick
          botonPaginaValida={props.data.info.prev !== null}
          onClick={() => {
            console.log("hola");
            location.replace(`/episodes/${props.page - 1}`);
            // Poner que paginaInvalida que debo poner BotonNextOrPrevous true
          }}
        >
          Anterior Pagina
        </BotonClick>

        <BotonClick
          botonPaginaValida={props.data.info.next !== null}
          onClick={() => {
            location.replace(`/episodes/${props.page + 1}`);
            //window.scroll(0, 0);
          }}
        >
          Siguiente Pagina
        </BotonClick>
      </BotonPaginas>
    </>
  );
};

export default EpisodesPaginados;

type InputProps = {
  botonPaginaValida: boolean;
};

const BotonClick = styled.button<InputProps>`
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  margin: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: ${(props) => (props.botonPaginaValida ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  outline: none;
  border-radius: 5px;
  border: 2px solid #212529;
  background: #212529;
  :active {
    background-color: red;
  }
`;

const BotonPaginas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
`;
