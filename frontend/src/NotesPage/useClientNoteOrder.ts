import { useState, useCallback, useEffect } from "react";

const storageKey = "tinyDovetailNoteOrder";

const getInitialState = (defaultOrderedNoteIds?: string[]) => {
  const localState = localStorage.getItem(storageKey);
  if (localState) {
    return JSON.parse(localState) as string[];
  }

  return defaultOrderedNoteIds;
};

// Manages note order state and stores it in LocalStorage
export const useClientNoteOrder = (defaultOrderedNoteIds?: string[]) => {
  const [orderedNoteIds, setOrderedNoteIds] = useState(
    getInitialState(defaultOrderedNoteIds)
  );

  // Update order with default if nothing in LS yet
  useEffect(() => {
    if (defaultOrderedNoteIds && orderedNoteIds === undefined) {
      setOrderedNoteIds(defaultOrderedNoteIds);
    }
  }, [defaultOrderedNoteIds, orderedNoteIds]);

  // Update LS on state change
  useEffect(() => {
    if (orderedNoteIds) {
      localStorage.setItem(storageKey, JSON.stringify(orderedNoteIds));
    }
  }, [orderedNoteIds]);

  const moveNoteDown = useCallback(
    (noteId: string) => {
      if (orderedNoteIds) {
        const index = orderedNoteIds.indexOf(noteId);
        if (index === orderedNoteIds.length - 1) {
          return;
        }

        const tempOrder = [...orderedNoteIds];
        tempOrder[index] = tempOrder[index + 1];
        tempOrder[index + 1] = noteId;
        setOrderedNoteIds(tempOrder);
      }
    },
    [orderedNoteIds]
  );

  const moveNoteUp = useCallback(
    (noteId: string) => {
      if (orderedNoteIds) {
        const index = orderedNoteIds.indexOf(noteId);
        if (index === 0) {
          return;
        }

        const tempOrder = [...orderedNoteIds];
        tempOrder[index] = tempOrder[index - 1];
        tempOrder[index - 1] = noteId;
        setOrderedNoteIds(tempOrder);
      }
    },
    [orderedNoteIds]
  );

  return {
    orderedNoteIds,
    moveNoteUp,
    moveNoteDown
  };
};
