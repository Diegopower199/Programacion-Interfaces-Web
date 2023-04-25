import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const TablaInformacionUsuario = () => {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var nombreUsuario = urlParams.get("nombreUsuario");


  const [test, setTest] = useState<{ test: string } | undefined>(undefined);
  const [rows, setRows] = useState<(string | number)[][]>([]);
  const [columns, setColumns] = useState<string[]>([
    "Nombre",
    "Edad",
    "Fecha de nacimiento",
  ]);
  const [typeColumn, setTypeColumn] = useState<string[]>([
    "text",
    "number",
    "date",
  ]);
  const [newRow, setNewRow] = useState<(string | number)[]>(["", "", ""]);
  const [valueSelect, setValueSelect] = useState("");
  const [valorColumna, setValorColumna] = useState<string>("");
  const [deleteRow, setDeleteRow] = useState<(string | number)[]>();

  /*const fetchAddRow = async () => {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filas: newRow,
        columnas: columns,
        nombreUsuario: nombreUsuario,
      }),
    };

    const response = await fetch(
      "http://localhost:8080/addInformacion",
      requestOptions
    );
    const data = await response.json();
    console.log("Informacion data: ", data);
    console.log("El dato de response.ok es: ", response.ok);

    const respuestaExitosa = response.ok;
        console.log(respuestaExitosa)
        if (respuestaExitosa) {
            setCreacionUsuarioCorrecta(true);
           
        }
        //setCreacionUsuarioCorrecta(response.ok);
        console.log("Response ok????? dentro de la funcion: ", respuestaExitosa, "          ", creacionUsuarioCorrecta);
        setTest(data);
  };*/

  useEffect( () => {
    console.log("GET: ", nombreUsuario);
    const fetchTest = async () => {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `http://localhost:8080/getInformacionTablaUser?nombreUsuario=${nombreUsuario}`,
        requestOptions
      ); //Mismo puerto que el back
      const data = await response.json();
      //console.log("DATA con Object: ", Object.values(data), "\n");
      

      const prueba =  data.informacionTabla;

      let filasTotales: string[][] = [];
      let columnasTotales: string[] = []

        

      //console.log("Toda la informacion de las filas almacenadas en la base de datos mongoo", filas)
      
      prueba.forEach( (item: { filas: string[], columnas: string[], nombreUsuario: string,}, index: number) => {
    

        filasTotales = [...filasTotales, item.filas]
        //columnasTotales = [...columnasTotales, item.columnas]
        
        console.log(item.columnas)
        console.log(item.nombreUsuario)
      })

      console.log("FIlas totales: ", filasTotales);
      setRows(filasTotales);
      //setColumns(columnasTotales);

      /*Object.values(data).forEach( (valores: unknown) => {
          console.log(typeof(valores));
          Object.values(valores).forEach( (valoresTabla) => {
            console.log(valoresTabla._id, valoresTabla.filas  )
          })
          
        })*/

      
    };
    fetchTest();
    console.log("Al iniciar la pagina: ", rows)
  }, []);

  

  useEffect(() => {
    //console.log("Post add row en el use effect da como resultado ", newRow);
    
    if ((JSON.stringify(newRow) !== JSON.stringify(["", "", ""]))) { // Para comparar que tienen los mismo valores
      console.log("El valor de newRow no es undefined", newRow, "\n", rows);
      const fetchAddRow = async () => {
        // POST request using fetch with async/await
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filas: newRow,
            columnas: columns,
            nombreUsuario: nombreUsuario,
          }),
        };

        const response = await fetch(
          "http://localhost:8080/addInformacion",
          requestOptions
        );
        const data = await response.json();
        console.log("Informacion data: ", data);
        console.log("El dato de response.ok es: ", response.ok);

        console.log("¿Se ha actualizado rows?: ", rows)

        /*const respuestaExitosa = response.ok;
            console.log(respuestaExitosa)
            if (respuestaExitosa) {
                setCreacionUsuarioCorrecta(true);
               
            }
            //setCreacionUsuarioCorrecta(response.ok);
            console.log("Response ok????? dentro de la funcion: ", respuestaExitosa, "          ", creacionUsuarioCorrecta);
            setTest(data);*/
      };
      fetchAddRow();
    }
  }, [rows]);

  useEffect(() => {
    //console.log("Delete row en el use effect da como resultado", deleteRow);
    if (deleteRow !== undefined) {
      console.log("El valor de delete row no es undefined es: ", deleteRow);
      // PONER AQUI EL FETCH
      const fetchDeleteRow = async () => {
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filas: deleteRow,
            nombreUsuario: nombreUsuario,
          }),
        };

        const response = await fetch(
          "http://localhost:8080/deleteInformacionTabla",
          requestOptions
        );
        const data = await response.json();
        console.log("Informacion data: ", data);
        console.log("El dato de response.ok es: ", response.ok);
      };
      fetchDeleteRow();
    }
  }, [deleteRow]);

  return (
    <>
      <Titulo>Table</Titulo>

      <Menu>
        <Wrapper columns={columns.length}>
          {columns.map((column, index) => (
            <>
              <ColumnDiv>
                <ColumnName
                  defaultValue={column}
                  onChange={(e) =>
                    setColumns(
                      columns.map((column, i) => {
                        if (i === index) {
                          return e.target.value;
                        } else {
                          return column;
                        }
                      })
                    )
                  }
                ></ColumnName>
              </ColumnDiv>
            </>
          ))}

          {rows.map((row, index) => (
            <>
              {row.map((item) => (
                <>
                  <GridItem row={index + 2}>{item}</GridItem>
                </>
              ))}
              <RemoveRowButton
                row={index + 2}
                column={columns.length + 1}
                onClick={async () => {
                  const borrarFilaElegidaEliminada = rows.filter(
                    (row, i) => i != index
                  );
                  const identificarFilaElegidaEliminada = rows.filter(
                    (row, i) => i === index
                  );

                  //console.log("Borrar la fila que he elegido: ", borrarFilaElegidaEliminada);

                  identificarFilaElegidaEliminada.forEach((valores) => {
                    console.log(
                      "Valores identificarFilaElegidaEliminada: ",
                      valores
                    );
                    setDeleteRow(valores);
                  });

                  setRows(borrarFilaElegidaEliminada);

                  console.log(
                    "INFORMACION DE TODAS LAS FILAS: ",
                    rows,
                    "\n\n\n"
                  );
                  //setDeleteRow()
                  console.log("Informacion de deleteRow: ", deleteRow);
                  //await fetchDeleteRow();
                }}
              >
                <Image width={20} height={20} src="/trash.png" alt=""></Image>
              </RemoveRowButton>
            </>
          ))}
        </Wrapper>

        <AddRowsDiv>
          <InputsDiv>
            {columns.map((column, index) => (
              <>
                <input
                  placeholder={column}
                  type={typeColumn[index]}
                  onChange={(e) =>
                    setNewRow(
                      newRow.map((value, i) => {
                        console.log("valor", value);
                        if (i === index) {
                          return e.target.value;
                        } else {
                          return value;
                        }
                      })
                    )
                  }
                ></input>
              </>
            ))}
            <button
              onClick={async () => {
                let ningunFallo: boolean = true;
                newRow.forEach((value) => {
                  console.log(
                    "EL tipo del valor es: ",
                    typeof value,
                    "  y el valor es: ",
                    value
                  );

                  if (typeof value === "number") {
                    if (value < 0) {
                      ningunFallo = false;
                    }
                  }

                  if (typeof value === "string") {
                    if (parseInt(value) < 0) {
                      console.log("numero no valido");
                      ningunFallo = false;
                    }
                  }

                  console.log(value);
                });

                if (ningunFallo) {
                  setRows([...rows, newRow]);
                  //await fetchAddRow();
                  console.log("ROWS: ", rows);
                } else {
                  alert("Hay errores en la introduccion de datos");
                }
              }}
            >
              Añadir
            </button>
          </InputsDiv>
        </AddRowsDiv>

        <Titulo>Add columns</Titulo>

        <div>
          <input
            type="text"
            placeholder="Nombre tabla"
            onBlur={(e) => setValorColumna(e.target.value)}
          ></input>
          <select
            value={valueSelect}
            onChange={(e) => {
              setValueSelect(e.target.value);
            }}
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="Date">Date</option>
            <option value="checkbox">Checkbox</option>
          </select>

          {columns.length < 10 && (
            <AddColumnButton
              row={1}
              column={columns.length + 1}
              onClick={() => {
                setColumns([...columns, valorColumna]);
                valueSelect;
                setTypeColumn([...typeColumn, valueSelect]);
                setNewRow([...newRow, ""]);
              }}
            >
              Add Column
            </AddColumnButton>
          )}
        </div>
        <ParrafoPrueba>{"ROWS: " + rows}</ParrafoPrueba>
        <ParrafoPrueba>{"DELETE ROW: " + deleteRow}</ParrafoPrueba>
        <ParrafoPrueba>{"NEW ROW: " + newRow}</ParrafoPrueba>
      </Menu>
    </>
  );
};

export default TablaInformacionUsuario;

type RowProps = {
  row: number;
  column?: number;
};

type WrapProps = {
  columns: number;
};

export const ParrafoPrueba = styled.p`
  background-color: blue;
  color: pink;
  font-size: 30px;
`;

export const Titulo = styled.h1`
  background-color: blue;
  color: white;
  font-size: 26px;
  border-radius: 10%;
`;

export const BotonAddColumn = styled.button`
  background-color: blue;
  color: white;
  border: 20%;
  border: 0px;
  padding: 0px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

export const Wrapper = styled.div<WrapProps>`
  margin-left: 60px;
  margin-right: 60px;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  grid-gap: 5px;
  grid-auto-rows: minmax(30px, auto);
  border: 5px solid black;
  padding: 10px;
`;

export const GridItem = styled.p<RowProps>`
  grid-row: ${(props) => props.row};
  border: 1px solid blue;
  text-align: center;
  line-height: 30px;
  padding: 15px;
  margin: 0;
  font-size: 18px;
`;

export const ColumnDiv = styled.div`
  display: flex;
  justify-content: center;
  border: 5px solid blue;
  padding: 20px;
  margin: 0;
`;

export const ColumnName = styled.input`
  padding: 0px;
  text-align: center;
  margin: 0px;
  font-size: 20px;
  font-weight: 600;
  border: none;
`;

export const AddRowsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 30px;
  text-align: center;
`;

export const InputsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  gap: 10px;
`;

export const RemoveRowButton = styled.button<RowProps>`
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.column};
  border: 2px solid red;
  background-image: "/trash.png";
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: red;
    color: white;
  }
`;

export const AddColumnButton = styled.button<RowProps>`
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.column};
  border: 2px solid green;
  background-image: "/trash.png";
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: green;
    color: white;
  }
`;

export const RemoveColumnButton = styled.button`
  border: 2px solid red;
  background-image: "/trash.png";
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 600;
  &:hover {
    background: red;
    color: white;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
`;
