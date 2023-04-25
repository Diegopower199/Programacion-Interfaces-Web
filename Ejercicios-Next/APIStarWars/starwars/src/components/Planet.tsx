import { Planet, PlanetAPI } from "@/type";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

const PlanetComponent: FC<{ id: string }> = ({ id }) => {
  const [data, setDataPlanet] = useState<Planet | undefined>(undefined);

  const fetchData = async () => {
    try {
      const chars = await fetch(`https://swapi.dev/api/planets/${id}`);
      const dataAPI: PlanetAPI = await chars.json();

      //const names = json.results.map( (char: any) => char.name)
      const data: Planet = {
        ...dataAPI,
        residents: await Promise.all(
          dataAPI.residents.map(async (r: string) => {
            const data = await fetch(r);
            return await data.json();
          })
        ),

        films: await Promise.all(
          dataAPI.films.map(async (f: string) => {
            const data = await fetch(f);
            return await data.json();
          })
        ),
      };

      setDataPlanet(data);
      //console.log(data);
    } catch (e) {
      //setDataPlanet()
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <DivInformacionPlaneta>
      <Link href="/informacion/planets/1">Back</Link>

      <TituloH1>{data?.name}</TituloH1>
      <ParrafoDescripcion>Rotation period: {data?.rotation_period}</ParrafoDescripcion>
      <ParrafoDescripcion>Orbital period: {data?.orbital_period}</ParrafoDescripcion>
      <ParrafoDescripcion>Diameter: {data?.diameter}</ParrafoDescripcion>
      <ParrafoDescripcion>Climate: {data?.climate}</ParrafoDescripcion>
      <ParrafoDescripcion>Gravity: {data?.gravity}</ParrafoDescripcion>
      <ParrafoDescripcion>Terrain: {data?.terrain}</ParrafoDescripcion>
      <ParrafoDescripcion>Surface water: {data?.surface_water}</ParrafoDescripcion>
      <ParrafoDescripcion>Population: {data?.population}</ParrafoDescripcion>
      <h2>Residents</h2>
      <ul>
        {data?.residents.map((resident) => (
          <li key={resident.name}> <ParrafoDescripcion>{resident.name}</ParrafoDescripcion></li>
        ))}
      </ul>
      <h2>Films</h2>
      <ul>
        {data?.films.map((film) => (
          <li key={film.title}> <ParrafoDescripcion>{film.title}</ParrafoDescripcion> </li>
        ))}
      </ul>
    </DivInformacionPlaneta>
  );
};

export default PlanetComponent;

const TituloH1 = styled.h1`
  display: flex;
  justify-content: center;
`;

const DivInformacionPlaneta = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const ParrafoDescripcion = styled.p`
  font: bold 100% monospace;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: black;
  font-size: 20px;
  text-decoration: none;
`;
