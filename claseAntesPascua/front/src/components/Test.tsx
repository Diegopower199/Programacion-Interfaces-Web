import React, { useEffect, useState } from "react";

const Test = () => {
    useEffect(() => {
        const fetchTest = async () => {
            const response = await fetch("http://localhost:8080/test"); //Mismo puerto que el back
            const data = await response.json();
            setTest(data);
            seta(response.ok);
            const g = response.ok;
            seta(g);
            console.log("aa", response.ok, a)
        }
        fetchTest();
    }, []);

    const [test, setTest] = useState<{test: string} | undefined>(undefined)
    const [a, seta] = useState<boolean>(false)

    return (
        <>
            {test && test.test}
        </>
    )
}

export default Test;