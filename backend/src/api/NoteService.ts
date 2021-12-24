import * as db from '../db'

export const getAllNotes = async () => {
  const result = await db.query('SELECT * FROM note')
  return result.rows
}

export const getNoteById = async (id: number) => {
  const result = await db.query('SELECT * FROM note WHERE id = $1', id)
  return result.rows[0]
}

export const getAllLabels = async () => {
  const result = await db.query('SELECT * FROM label')
  return result.rows
}

export const updateNoteTitle = async (id: number, title: string) => {
  await db.query('UPDATE note SET title = $2 WHERE id = $1', id, title)
  return getNoteById(id)
}

export const updateNoteContent = async (id: number, content: string) => {
  await db.query('UPDATE note SET content = $2 WHERE id = $1', id, content)
  return getNoteById(id)
}
export const updateNoteLabel = async (id: number, labels: string[]) => {
  const label = labels.toString()
  await db.query('UPDATE note SET labels = $2 WHERE id = $1', id, label)
  return getNoteById(id)
}

export const createLabel = async (label: string) => {
  const result = await db.query('INSERT INTO label(value) VALUES ($1)', label)
  return result.rows[0]
}
