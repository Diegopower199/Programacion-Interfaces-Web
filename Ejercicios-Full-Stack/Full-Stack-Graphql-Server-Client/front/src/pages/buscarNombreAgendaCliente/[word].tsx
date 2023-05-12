import WordFound from "@/components/wordFoundAgenda";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

const router = useRouter();



export const getServerSideProps: GetServerSideProps = async (context) => {

    const { word } = router.query;
    console.log(word)

    return {
        props: {
            word: word
        }
    }
}

const WordAgendaFound: NextPage<{word: string}> = ({ word }) => {
    console.log(word)
    return (
        <>
            <WordFound word={word}/>
        </>
    )
} 

export default WordAgendaFound;