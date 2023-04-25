import { Inter } from '@next/font/google'
import Link from 'next/link'
import Navbar from '../components/navbar';


const inter = Inter({ subsets: ['latin'] })

let valor = "";

/*function dado () {
  valor = document.getElementById("name").value
  document.getElementById("boton").innerHTML = valor;

  document.getElementById("hola").innerHTML = valor;

}*/


export default function Home() {

  return (
    
    <>
      <Navbar/>
      
    </>
  )

}
