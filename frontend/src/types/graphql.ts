/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NoteTitleMutation
// ====================================================

export interface NoteTitleMutation_updateNoteTitle {
  readonly __typename: "Note";
  readonly id: string;
  readonly title: string;
  readonly content: string;
}

export interface NoteTitleMutation {
  readonly updateNoteTitle: NoteTitleMutation_updateNoteTitle | null;
}

export interface NoteTitleMutationVariables {
  readonly id: string;
  readonly title: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NoteContentMutation
// ====================================================

export interface NoteContentMutation_updateNoteContent {
  readonly __typename: "Note";
  readonly id: string;
  readonly title: string;
  readonly content: string;
}

export interface NoteContentMutation {
  readonly updateNoteContent: NoteContentMutation_updateNoteContent | null;
}

export interface NoteContentMutationVariables {
  readonly id: string;
  readonly content: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NoteQuery
// ====================================================

export interface NoteQuery_note {
  readonly __typename: "Note";
  readonly id: string;
  readonly title: string;
  readonly content: string;
}

export interface NoteQuery {
  readonly note: NoteQuery_note | null;
}

export interface NoteQueryVariables {
  readonly id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NotesQuery
// ====================================================

export interface NotesQuery_notes {
  readonly __typename: "Note";
  readonly id: string;
  readonly title: string;
}

export interface NotesQuery {
  readonly notes: ReadonlyArray<NotesQuery_notes>;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
