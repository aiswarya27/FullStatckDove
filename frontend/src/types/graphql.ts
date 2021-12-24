/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LabelQuery
// ====================================================

export interface LabelQuery_labels {
  readonly __typename: "Label";
  readonly id: string;
  readonly value: string;
}

export interface LabelQuery {
  readonly labels: ReadonlyArray<LabelQuery_labels>;
}

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
// GraphQL mutation operation: CreateLabelMutation
// ====================================================

export interface CreateLabelMutation_createLabel {
  readonly __typename: "Label";
  readonly value: string;
}

export interface CreateLabelMutation {
  readonly createLabel: CreateLabelMutation_createLabel | null;
}

export interface CreateLabelMutationVariables {
  readonly label: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateNoteLabelMutation
// ====================================================

export interface UpdateNoteLabelMutation_updateNoteLabel {
  readonly __typename: "Note";
  readonly id: string;
  readonly labels: string | null;
}

export interface UpdateNoteLabelMutation {
  readonly updateNoteLabel: UpdateNoteLabelMutation_updateNoteLabel | null;
}

export interface UpdateNoteLabelMutationVariables {
  readonly noteId: string;
  readonly labels?: ReadonlyArray<string> | null;
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
  readonly labels: string | null;
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
