import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <PosicionLinkDiv>
        <DesignLink>
          <Link href={`./informacion/films/1`}>Films</Link>{" "}
        </DesignLink>
        <DesignLink>
          <Link href={`./informacion/people/1`}>People</Link>{" "}
        </DesignLink>
        <DesignLink>
          <Link href={`./informacion/planets/1`}>Planet</Link>{" "}
        </DesignLink>
        <DesignLink>
          <Link href={`./informacion/species/1`}>Species</Link>{" "}
        </DesignLink>
        <DesignLink>
          <Link href={`./informacion/starships/1`}>StarShip</Link>{" "}
        </DesignLink>
        <DesignLink>
          <Link href={`./informacion/vehicles/1`}>Vehicles</Link>{" "}
        </DesignLink>
      </PosicionLinkDiv>

      <h3>SOLO HE HECHO EL FICHERO PLANET, LOS DEMAS NO</h3>
    </>
  );
}

const PosicionLinkDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DesignLink = styled.div`
  background-color: pink;
  color: black;
  font-size: 23px;
  margin: 10px;
`;
