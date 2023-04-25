import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
    <header>
        <div className="enlacesPrincipales">
          <div>
            <Image src="/Imagenes/Just-Eat-Imagen.jpg" alt="una foto" width={200} height={200}/>
          </div>

          <div className="links">
            <Link href="/persona"> Trabaja como repartidor </Link>
            <Link href="/persona"> Inicio de sesion </Link>
            <Link href="/persona"> Ayuda </Link>
          </div>
        </div>
      </header>

      <div>

        <div className="centrarBuscar">
          <p>Pide lo que te pida el cuerpo</p>
          <br/>
          <p>Elige que comida quieres llevarte</p>
          <br/>
        </div>
      </div>
    </>
  )
}
