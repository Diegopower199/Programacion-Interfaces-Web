import { CharacterAPI } from "@/type";
import Link from "next/link";
import styled from "styled-components";

let page = 0;

const CharactersList = ({ data }: CharacterAPI) => {
  return (
    <div>
      <h1>Characters Lists</h1>

      <DivPersonajes>
        {data.map(
          (character) => (
            (page = character.page),
            (
              <DivPersonajeUnicoLink>
                
                <Link key={character.id} href={`/personaje/[id]`} as={`/personaje/${character.id}`}>
                  
                  <DivPersonajeUnico>
                    
                    <ImagenPersonaje src={character.image} alt={character.name}></ImagenPersonaje>

                    <TituloPersonaje> {character.name} </TituloPersonaje>

                  </DivPersonajeUnico>
                  
                </Link>
              </DivPersonajeUnicoLink>
            )
          )
        )}
      </DivPersonajes>
      
      <BotonPaginas>
        <DivClickPaginas botonPaginaValida={page !== 1}>
          <Link style={links} href={`/personajes/${page - 1}`}>Anterior</Link>
        </DivClickPaginas>
        <DivClickPaginas botonPaginaValida={page !== 6}>
          <Link style={links} href={`/personajes/${page + 1}`}>Siguiente</Link>
        </DivClickPaginas>
      </BotonPaginas>

      <BotonPaginas>
        <BotonClick
          botonPaginaValida={page !== 1}
          onClick={() => {
            console.log("hola");
            <Link href={`/personajes/${page - 1}`}>Anterior</Link>;
            //location.replace(`/informacion/planets/${page - 1}`);
            // Poner que paginaInvalida que debo poner BotonNextOrPrevous true
          }}
        >
          Anterior Pagina
        </BotonClick>

        <BotonClick
          botonPaginaValida={page !== 6}
          onClick={() => {
            location.replace(`/personajes/${page + 1}`);
            window.scroll(0, 0);
          }}
        >
          Siguiente Pagina
        </BotonClick>
      </BotonPaginas>

      <Link style={links} href={`/personajes/${page - 1}`}>Anterior</Link>
    </div>
  );
};

export default CharactersList;

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

const DivPersonajeUnico = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 0px;
    margin: 0px;

    
    border: 2px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
    width: 300px;
    height: 300px;
    text-decoration: none;
    //border: 2px solid black;
`

const ImagenPersonaje = styled.img`
    width: 200px;
    height: 200px;
    text-decoration: none;
`

const TituloPersonaje = styled.p`
    font: bold 100% monospace;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: white;
    font-size: 20px;
    text-decoration: none;
`

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