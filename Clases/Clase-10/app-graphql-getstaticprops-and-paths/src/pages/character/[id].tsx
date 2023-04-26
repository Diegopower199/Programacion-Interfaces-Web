export const getServerSideProps: GetServerSideProps = async (context) => {
    // Aqui cogemos el id desde el servidor pero no estamos renderizando nada en el servidor y llamamos a la pagina (cliente) pasando el id 
    const {id} = context.query;
    
  
    return {
      props: {
        id
      }
    }
  }
  
  const Page: NextPage<{id: string}> = ( { id }) => {
    return (
      <>
        <Character id={id}/>
      </>
    )
  }
  
  
export default Page;