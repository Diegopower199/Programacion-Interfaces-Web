import Image from 'next/image';
import Link from 'next/link';
import Persona from '@/components/persona';

export default function Home() {
  const name = "Alberto";
  return (
    <>
      <Link href="/persona"> Mis personas </Link>
      <hr/>
      Hola {name}.<br/>
      Tu nombre tiene {name.length} letras.<br/>
    </>
  )
  }