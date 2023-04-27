import { GetServerSideProps } from "next";
import  getClient  from "../libs/client";


import {gql }from "@apollo/client";
import Link from "next/link";
/*
export const getServerSideProps:GetServerSideProps = async (context) => {

  const {page} = context.query;
  const query = gql`
  query characters($page : Int!){
    characters(page:$page){
    results{
      name
    }
  }
  
}

  
  
  `

  const client = getClient();
  const {data} = await client.query<{
    character: {
        name:string
      
    }
  }>({
    query,
    variables:{
      page,
    }
  });

  return {
    props:{
      name: data.character.name
    }
  }

}
*/

export default function Home(props: {name: string}){
  return(
    <>
      <Link href="/page/1">A la pag 1</Link>
    </>
  )
}
