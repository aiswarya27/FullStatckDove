import { useMutation, useQuery } from '@apollo/client'
import { createStyles, InputLabel, makeStyles, Paper, TextField, Theme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import React, { useCallback, useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'

import { graphql } from './types'

import { nonNullable } from './util'
import {
  ADD_LABEL_MUTATION,
  LABEL_QUERY,
  NOTE_CONTENT_MUTATION,
  NOTE_TITLE_MUTATION,
  UPDATE_NOTE_LABEL_MUTATION,
} from './utils/DataRelatedQueries'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(3, 0),
    },
    input: {
      margin: theme.spacing(3, 0),
    },
    tag: {
      margin: theme.spacing(0.5),
    },
  }),
)

interface Props {
  id: string
  title: string
  content: string
  labels?: string
}

export const Note: React.FC<Props> = ({ id, title, content, labels }) => {
  const classes = useStyles()
  const { data } = useQuery<graphql.LabelQuery>(LABEL_QUERY)

  const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  })

  const processLabelsData = () => {
    if (data && data.labels) {
      return data.labels.map(labelValue => {
        return { value: labelValue.value, label: labelValue.value }
      })
    } else return []
  }

  const processSavedLabelsData = () => {
    if (labels) {
      let notesLabel = labels.split(',')
      return notesLabel.map(label => {
        return { value: label, label: label }
      })
    } else return ['']
  }

  const [needToUpdateNotLabel, setNeedToUpdateNotLabel] = useState(false)
  const [options, setOptions] = useState(processLabelsData)
  const [noteLabels, setNoteLabels] = useState(labels ? processSavedLabelsData : ([''] as any))

  const [updateNoteTitleMutation] = useMutation<
    graphql.NoteTitleMutation,
    graphql.NoteTitleMutationVariables
  >(NOTE_TITLE_MUTATION)
  const [createLabelMutation] = useMutation<
    graphql.CreateLabelMutation,
    graphql.CreateLabelMutationVariables
  >(ADD_LABEL_MUTATION)
  const [updateNoteContentMutation] = useMutation<
    graphql.NoteContentMutation,
    graphql.NoteContentMutationVariables
  >(NOTE_CONTENT_MUTATION)
  const [updateNoteLabelMutation] = useMutation<
    graphql.UpdateNoteLabelMutation,
    graphql.UpdateNoteLabelMutationVariables
  >(UPDATE_NOTE_LABEL_MUTATION)

  useEffect(() => {
    setOptions(processLabelsData)
  }, [data])

  useEffect(() => {
    if (needToUpdateNotLabel) {
      let filteredNoteLabels: string[] = noteLabels.map(
        (noteLabel: { label: string; value: string }) => noteLabel.label,
      )
      filteredNoteLabels = filteredNoteLabels.filter(nonNullable)
      updateNoteLabelMutation({
        variables: {
          noteId: id,
          labels: filteredNoteLabels,
        },
      })
    }
  }, [noteLabels])

  const handleTitleChange = useCallback(
    async e => {
      const title = e.target.value
      await updateNoteTitleMutation({
        variables: {
          id,
          title,
        },
      })
    },
    [id, updateNoteTitleMutation],
  )

  const handleContentChange = useCallback(
    async e => {
      const content = e.target.value
      await updateNoteContentMutation({
        variables: {
          id,
          content,
        },
      })
    },
    [id, updateNoteContentMutation],
  )

  const handleChange = useCallback(
    selectedLabel => {
      setNeedToUpdateNotLabel(true)
      setNoteLabels(selectedLabel)
    },
    [noteLabels],
  )

  const handleCreate = useCallback(
    async (newLabel: string) => {
      const formattedLabelOption = createOption(newLabel)
      setOptions([...options, formattedLabelOption])
      setNoteLabels([...noteLabels, formattedLabelOption])
      setNeedToUpdateNotLabel(true)
      await createLabelMutation({
        variables: {
          label: formattedLabelOption.value,
        },
      })
    },
    [options, noteLabels],
  )
  return (
    <Paper className={classes.root}>
      <Typography variant="h3">Note</Typography>
      <TextField
        label={'Title'}
        className={classes.input}
        defaultValue={title}
        onBlur={handleTitleChange}
        fullWidth
      />
      <TextField
        label={'Content'}
        className={classes.input}
        defaultValue={content}
        onBlur={handleContentChange}
        fullWidth
        multiline
      />
      <div>
        <InputLabel shrink>Labels</InputLabel>
        <CreatableSelect
          isClearable
          value={noteLabels}
          options={options}
          onChange={handleChange}
          onCreateOption={handleCreate}
          isMulti
        />
      </div>
    </Paper>
  )
}
