import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <div className="nombres">
        <Link href="./Alberto" id="alberto">Alberto</Link>
        <Link href="./Lucia">Lucia</Link>
        <Link href="./Diego">Diego</Link>
       </div>
    </>
  )
}
