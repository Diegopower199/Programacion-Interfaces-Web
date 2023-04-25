import Link from 'next/link';

export default function Navbar () {
    return (
        <>
            <nav>
                <Link href={`/`}>Home </Link>
                <Link href={`/users`}> Users</Link>
                <Link href={`/posts`}>Posts (aun no tenemos nada) </Link>
            </nav>

            
        </>
    )
}

/*
<style jsx global>
    {`
        div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: pink;
        }
    `}
</style>
*/            