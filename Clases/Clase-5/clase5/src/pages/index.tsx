import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Formulario from '@/componentes/Formulario'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <h1>Ejemplo de hook de estado</h1>

      <Formulario/>
    </>
  )
}

// Vamos a ver hook de estado y hook de efecto
// Y ver styled-components
