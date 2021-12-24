import * as db from "../db";

export const getAllNotes = async () => {
  const result = await db.query("SELECT * FROM note");
  return result.rows;
};

export const getNoteById = async (id: number) => {
  const result = await db.query("SELECT * FROM note WHERE id = $1", id);
  return result.rows[0];
};

export const updateNoteTitle = async (id: number, title: string) => {
  await db.query("UPDATE note SET title = $2 WHERE id = $1", id, title);
  return getNoteById(id);
};

export const updateNoteContent = async (id: number, content: string) => {
  await db.query("UPDATE note SET content = $2 WHERE id = $1", id, content);
  return getNoteById(id);
};
