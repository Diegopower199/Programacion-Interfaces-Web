import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [numeroIdCharacter, setNumeroIdCharacter] = useState<number>(1);
  const [numeroIdLocation, setNumeroIdLocation] = useState<number>(1);
  const [numeroIdEpisode, setNumeroIdEpisode] = useState<number>(1);
  const [numeroPageCharacter, setNumeroPageCharacter] = useState<number>(1);
  const [numeroPageEpisode, setNumeroPageEpisode] = useState<number>(1);
  const [numeroPageLocation, setNumeroPageLocation] = useState<number>(1);

  const [arrayIdCharacters, setArrayIdCharacters] = useState<number[]>([]);
  const [arrayIdLocation, setArrayIdLocation] = useState<number[]>([]);
  const [arrayIdEpisodes, setArrayIdEpisodes] = useState<string>("");
  return (
    <>
      <PosicionarLinks>
        <Parrafos>
          Numero id de character{" "}
          <input
            type="number"
            onChange={(e) => setNumeroIdCharacter(Number(e.target.value))}
          ></input>{" "}
          <Link href={`/character/${numeroIdCharacter}`}>
            /character/{numeroIdCharacter}
          </Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero de pagina de characters{" "}
          <input
            type="number"
            onChange={(e) => setNumeroPageCharacter(Number(e.target.value))}
          ></input>{" "}
          <Link href={`/characters/${numeroPageCharacter}`}>
            /characters/{numeroPageCharacter}
          </Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero ids de characters{" "}
          <input type="number" onChange={(e) => console.log("nada")}></input>{" "}
          <Link href={`/`}>NO ESTA HECHO</Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero id de location{" "}
          <input
            type="number"
            onChange={(e) => setNumeroIdLocation(Number(e.target.value))}
          ></input>{" "}
          <Link href={`/location/${numeroIdLocation}`}>
            /location/{numeroIdLocation}
          </Link>
        </Parrafos>
      </PosicionarLinks>
      
      <PosicionarLinks>
        <Parrafos>
          Todos los locations{" "}
          <input
            type="number"
            onChange={(e) => setNumeroPageLocation(Number(e.target.value))}
          ></input>{" "}
          <Link href={`/locations/${numeroPageLocation}`}>/locations/${numeroPageLocation}</Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero ids de locations{" "}
          <input type="number" onChange={(e) => console.log("nada")}></input>{" "}
          <Link href={`/`}>NO ESTA HECHO</Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero id de episode{" "}
          <input
            type="number"
            onChange={(e) => setNumeroIdEpisode(Number(e.target.value))}
          ></input>{" "}
          <Link href={`/episode/${numeroIdEpisode}`}>
            /episode/{numeroIdEpisode}
          </Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero de pagina de episodes{" "}
          <input
            type="number"
            onChange={(e) => setNumeroPageEpisode(Number(e.target.value))}
          ></input>{" "}
          <Link href={`/episodes/${numeroPageEpisode}`}>
            /episodes/{numeroPageEpisode}
          </Link>
        </Parrafos>
      </PosicionarLinks>

      <PosicionarLinks>
        <Parrafos>
          Numero ids de episodes{" "}
          <input type="text" onChange={(e) => {
            setArrayIdEpisodes(e.target.value)
          }}></input>{" "}
          <Link href={`/episodesByIds/${arrayIdEpisodes}`}>NO ESTA HECHO</Link>
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

