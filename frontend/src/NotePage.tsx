import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router'

import { graphql } from './types'
import { Note } from './Note'
import { NOTE_QUERY } from './utils/DataRelatedQueries'

export const NotePage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>()
  const { data } = useQuery<graphql.NoteQuery, graphql.NoteQueryVariables>(NOTE_QUERY, {
    variables: { id: noteId! },
  })

  if (data === undefined || data.note === null) {
    return null
  }

  const { id, title, content, labels } = data.note

  return <Note id={id} title={title} content={content} labels={labels ? labels : ''} />
}
