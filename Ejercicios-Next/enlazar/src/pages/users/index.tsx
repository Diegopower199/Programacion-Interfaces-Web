import Navbar from "@/components/navbar";



export default function Users () {
    return (
        <>
            <Navbar/>
            <h1>Users Pages</h1>
        </>
    )
}

export async function getServerSideProps() {
    // Esta funcion va a correr dentro del servidor
    const res = await fetch('');
}
