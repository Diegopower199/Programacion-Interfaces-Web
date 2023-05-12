import Agenda from "@/components/agenda";
import { gql } from "@apollo/client";
import Link from "next/link";
import getApolloClient from "@/libs/client";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

type GraphQLResponse = {getWord: string};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { word } = context.query;
  //const word: string = "h";
  const query = gql`
    query Query($word: String!) {
      getWord(word: $word)
    }
  `;

  const client = getApolloClient();
  const { data } = await client.query<GraphQLResponse>({
    query,
    variables: {
      word: word,
    },
  });

  console.log("Informacion data", { data });

  return {
    props: {
      data: data,
    },
  };
};

export default function BuscarNombre(props: { data: GraphQLResponse }) {
  console.log("ANtes de todo", props.data.getWord);

    return (
      <>
        <h1>Name: {props.data.getWord}</h1>
      </>
    );

}
