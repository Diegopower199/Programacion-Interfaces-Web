import { gql, useQuery } from "@apollo/client"
import React, { FC } from "react"

const Character: FC<{id: string}> = ({id}) => {

    const query = gql`
        query character($id: ID!){
            character(id: $id) {
                name
            }
        }
    `

    const {loading, error, data} = useQuery<{
        character: {
            name: string
        }
    }>(query, {
        variables: {
            id
        }
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Upps. La vida es dura</div>
    return (
        <div>
            {data!.character.name}
        </div>
    )
}

export default Character