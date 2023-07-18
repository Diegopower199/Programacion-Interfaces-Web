import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [numeroIdPlanet, setNumeroIdPlanet] = useState<number>(1);
  const [numeroPagePlanet, setNumeroPagePlanet] = useState<number>(1);
  return (
    <>
      <PosicionarLinks>
        <Parrafos>
          Numero id de planets{" "}
          <input
            type="number"
            onChange={(e) => setNumeroIdPlanet(Number(e.target.value))}
          ></input>{" "}
          <Link href={`/planet/${numeroIdPlanet}`}>
            /planet/{numeroIdPlanet}
          </Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero de pagina de planets{" "}
          <input
            type="number"
            onChange={(e) => setNumeroPagePlanet(Number(e.target.value))}
          ></input>{" "}
          <Link href={`/planets/${numeroPagePlanet}`}>
            /planets/{numeroPagePlanet}
          </Link>
        </Parrafos>
      </PosicionarLinks>

      

    </>
  );
}

const PosicionarLinks = styled.div`
  display: flex;
  align-items: center;
`;

const Parrafos = styled.p`
  font-family: Arial, sans-serif;
  font-size: 18px;
  color: #333;
  line-height: 1.5em;
  text-align: justify;
  color: #2f2f2f;
  border-radius: 5px;
`;
