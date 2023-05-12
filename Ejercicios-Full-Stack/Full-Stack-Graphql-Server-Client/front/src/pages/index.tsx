import Agenda from '@/components/agenda'
import { gql } from '@apollo/client';
import Link from 'next/link'
import getApolloClient from "@/libs/client"

type GraphQLResponse = {getWords:{word: string}[]};

export async function getServerSideProps(){

  const query = gql`
  query {
    getWords {
      word
    }
  }
  `;

  console.log("Query antes: ", query)

  const client = getApolloClient();
  const {data} = await client.query<GraphQLResponse>({
    query
  });

  console.log("Informacion data", {data})

  return {
    props: {
      data: data
    }
  }
}

export default function Home(props:{data: GraphQLResponse}) {

  console.log(props.data);

  return (
    <>
    <Agenda data={props.data} ></Agenda>
    </>
  )
}