import { gql, useQuery } from "@apollo/client";
import getClient from "@/libs/client";
import React, { FC, useEffect, useState } from "react";

const WordFound: FC<{ word: string }> = ({ word }) => {
  const query = gql`
    query Query($word: String!) {
      getWord(word: $word)
    }
  `;

  const { data, loading, error } = useQuery<{
    getWord: string;
  }>(query, {
    variables: {
      word,
    },
  });

  if (loading) {
    return (
        <>
            Loading...
        </>
    )
  }

  if (error) {
    return (
        <>
            Error, {error.message}
        </>
    )
  }

  return (
    <>
        Word encontrado: {data?.getWord}
    </>
  )
};

export default WordFound;
