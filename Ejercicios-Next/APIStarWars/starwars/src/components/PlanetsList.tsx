import Link from "next/link";
import styled from "styled-components";

let page = 0;

const PlanetsList = ({
  data,
}: {
  data: Array<{
    name: string;
    id: string;
    page: number;
  }>;
}) => {
  return (
    <div>
      <h1>Planets</h1>

      <DivPersonajes>
        {data.map(
          (planet) => (
            (page = planet.page),
            (
              <DivPersonajeUnicoLink>
                <Link
                  key={planet.id}
                  href={`/informacion/planet/[id]`}
                  as={`/informacion/planet/${planet.id}`}
                >
                  {planet.name}
                </Link>
              </DivPersonajeUnicoLink>
            )
          )
        )}
      </DivPersonajes>

      <BotonPaginas>
        <DivClickPaginas botonPaginaValida={page !== 1}>
          <Link style={links} href={`/informacion/planets/${page - 1}`}>Anterior</Link>
        </DivClickPaginas>
        <DivClickPaginas botonPaginaValida={page !== 6}>
          <Link style={links} href={`/informacion/planets/${page + 1}`}>Siguiente</Link>
        </DivClickPaginas>
      </BotonPaginas>

      <BotonPaginas>
        <BotonClick
          botonPaginaValida={page !== 1}
          onClick={() => {
            console.log("hola");
            <Link href={`/informacion/planets/${page - 1}`}>Anterior</Link>;
            //location.replace(`/informacion/planets/${page - 1}`);
            // Poner que paginaInvalida que debo poner BotonNextOrPrevous true
          }}
        >
          Anterior Pagina
        </BotonClick>

        <BotonClick
          botonPaginaValida={page !== 6}
          onClick={() => {
            location.replace(`/informacion/planets/${page + 1}`);
            window.scroll(0, 0);
          }}
        >
          Siguiente Pagina
        </BotonClick>
      </BotonPaginas>

      <Link style={links} href={`/informacion/planets/${page - 1}`}>Anterior</Link>
    </div>
  );
};

export default PlanetsList;

const links: React.CSSProperties = {
  textDecoration: "none",
  color: "white"
}

const DivPersonajes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  justify-items: center;
  font-family: "Courier New", Courier, monospace;
  color: rgb(176, 176, 176);
  background-color: rgb(126, 21, 21);
`;

const a = styled.link`
  text-decoration: none;
`
const DivPersonajeUnicoLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 300px;
  width: 300px;
  margin: 50px;
  text-decoration: none;
  background-color: aqua;
  :hover {
    background-color: #208b167c;
  }
  :active :visited {
    text-decoration: none;
  }
`;

type InputProps = {
  botonPaginaValida: boolean;
};

const DivClickPaginas = styled.div<InputProps>`
  text-decoration: none;
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
