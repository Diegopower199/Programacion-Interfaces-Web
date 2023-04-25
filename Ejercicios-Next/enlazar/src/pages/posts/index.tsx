import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Posts ( ) {


    return (
        <>
            <Navbar/>
        </>
    )
}

export async function getServerSideProps() {
    // Esta funcion va a correr dentro del servidor
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
  
    return {
      props: {
        posts: posts
      }
    }
  }

// Documentacion: https://nextjs.org/docs/basic-features/data-fetching/overview#getserversideprops-server-side-rendering