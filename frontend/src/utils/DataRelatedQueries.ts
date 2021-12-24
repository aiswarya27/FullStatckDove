import { gql } from '@apollo/client'

export const LABEL_QUERY = gql`
  query LabelQuery {
    labels {
      id
      value
    }
  }
`

export const NOTE_TITLE_MUTATION = gql`
  mutation NoteTitleMutation($id: ID!, $title: String!) {
    updateNoteTitle(id: $id, title: $title) {
      id
      title
      content
    }
  }
`

export const ADD_LABEL_MUTATION = gql`
  mutation CreateLabelMutation($label: String!) {
    createLabel(label: $label) {
      value
    }
  }
`

export const UPDATE_NOTE_LABEL_MUTATION = gql`
  mutation UpdateNoteLabelMutation($noteId: ID!, $labels: [String!]) {
    updateNoteLabel(id: $noteId, labels: $labels) {
      id
      labels
    }
  }
`

export const NOTE_CONTENT_MUTATION = gql`
  mutation NoteContentMutation($id: ID!, $content: String!) {
    updateNoteContent(id: $id, content: $content) {
      id
      title
      content
    }
  }
`

export const NOTE_QUERY = gql`
  query NoteQuery($id: ID!) {
    note(id: $id) {
      id
      title
      content
      labels
    }
  }
`
