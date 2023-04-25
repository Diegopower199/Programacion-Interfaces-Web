import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const name = "Alberto";
  return (
    <>
      Para crear el proyecto este tengo que hacer np create-next-app
      Y a las opciones de elegir dar a las tres primeras SI, y a la ultima darle un NO
      Para ejecutarlo npm run dev


      <br></br>
      Hola {name}.
      <br></br>
      Hola paco
      <Link href="https://google.com">Direccion de google</Link>
      <br></br>
      <a href="https://abc.com">Vamos a ir al abc</a>
      <br></br>
      <Image src="/descarga.jpg" alt="una foto" width="200" height="200"/>
    </>
  )
}
