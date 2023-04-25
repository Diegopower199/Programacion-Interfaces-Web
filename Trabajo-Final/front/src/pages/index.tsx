import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Registrar from '@/components/Registrar'
import BorrarInformacion from '@/components/BorrarInformacion'
import TablaInformacionUsuario from '@/components/TablaInformacionUsuario'
import { useRouter } from 'next/router'
import { useEffect } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  useEffect( () => {
    router.push("./loginUser")
  })

  return (
    <>
          
    </>
  )
}

// <Registrar/>
