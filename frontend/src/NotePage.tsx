import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { Note } from "./Note";
import { graphql } from "./types";

const NOTE_QUERY = gql`
  query NoteQuery($id: ID!) {
    note(id: $id) {
      id
      title
      content
    }
  }
`;

export const NotePage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const { data } = useQuery<graphql.NoteQuery, graphql.NoteQueryVariables>(
    NOTE_QUERY,
    {
      variables: { id: noteId! }
    }
  );

  if (data === undefined || data.note === null) {
    return null;
  }

  const { id, title, content } = data.note;

  return <Note id={id} title={title} content={content} />;
};
