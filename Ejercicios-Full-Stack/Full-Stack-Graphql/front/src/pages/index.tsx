import Agenda from '@/components/agenda'
import { getClientSSR } from '@/utils/apolloclient';
import { gql } from '@apollo/client';
import Link from 'next/link'

type GraphQLResponse = {getWords:{word: string}[]};

export async function getServerSideProps(){
  const query = gql`
  query {
    getWords {
      word
    }
  }
  `;

  const client = getClientSSR();
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