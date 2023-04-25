
import { Inter } from '@next/font/google'

import getApolloClient from "@/libs/client";
import {gql} from "@apollo/client"
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Character from '@/components/Character'



export const getServerSideProps: GetServerSideProps = async (context) => {
  // Esto es una peticion desde el servidor completamente
  const { id } = context.query;

  const query = gql`
    query character($id: ID!) {
      character (id: $id) {
        name
      }
    }
  `

  const client = getApolloClient();
  const { data } = await client.query<{
    character: {
      name: string
    }
  }>({
    query,
    variables: {
      id
    }
  })

  return {
    props: {
      name: data.character.name
    }
  }
}

const Page: NextPage<{name: string}> = ( props: { name: string }) => {
  return (
    <>
      {props.name}
    </>
  )
}



/*
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
*/

export default Page;