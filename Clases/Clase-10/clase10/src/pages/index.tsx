/*
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import getApolloClient from "@/libs/client";
import {gql} from "@apollo/client"

export const getServerSideProps = async () => { // LADO DEL SERVIDOR
  const query = gql`
    query{
      character(id: 3){
        name
      }
    }
  `

  const client = getApolloClient();
  const {data} = await client.query<{
    character: {
      name: string
    }
  }>({
    query
  })

  return {
    props: {
      name: data.character.name,
    }
  }
}

export default function Home(props: {name: string}) {
  return (
    <>
      {props.name}
    </>
  )
}
*/


