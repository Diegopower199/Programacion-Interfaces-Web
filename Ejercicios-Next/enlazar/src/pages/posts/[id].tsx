import Navbar from "@/components/navbar";
import { useRouter } from "next/router"

export default function post () {
    const router = useRouter();
    console.log(router);

    return (
        <>
            <Navbar/>
            <h1>Post</h1>
            <p>Post ID: {router.query.id} </p>
            <p>El video que lo explica esta aqui: https://www.youtube.com/watch?v=zUtAronW0pY</p>
        </>
    )
}