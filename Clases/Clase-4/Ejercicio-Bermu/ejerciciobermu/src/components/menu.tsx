type Menu = {
    //nombre: string;
}

import Link from 'next/link';

const menu = (props: Menu) => {
    return (
        <div className="menu">
            <Link href="/persona"> Persona </Link>
            <hr/>
            <Link href="/persona2"> Persona 2 </Link>
            <hr/>
            <Link href="/persona3"> Persona 3</Link><br/>
            
        </div>
    );
}

export default menu;