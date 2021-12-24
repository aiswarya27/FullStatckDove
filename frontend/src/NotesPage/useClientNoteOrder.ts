import { useState, useCallback, useEffect } from 'react'

const storageKey = 'tinyDovetailNoteOrder'

const getInitialState = (defaultOrderedNoteIds?: string[]) => {
  const localState = localStorage.getItem(storageKey)
  if (localState) {
    return JSON.parse(localState) as string[]
  }

  return defaultOrderedNoteIds
}

// Manages note order state and stores it in LocalStorage
export const useClientNoteOrder = (defaultOrderedNoteIds?: string[]) => {
  const [orderedNoteIds, setOrderedNoteIds] = useState(getInitialState(defaultOrderedNoteIds))

  // Update order with default if nothing in LS yet
  useEffect(() => {
    if (defaultOrderedNoteIds && orderedNoteIds === undefined) {
      setOrderedNoteIds(defaultOrderedNoteIds)
    }
  }, [defaultOrderedNoteIds, orderedNoteIds])

  // Update LS on state change
  useEffect(() => {
    if (orderedNoteIds) {
      localStorage.setItem(storageKey, JSON.stringify(orderedNoteIds))
    }
  }, [orderedNoteIds])

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) {
        return
      }

      const newItems = orderedNoteIds ? [...orderedNoteIds] : []
      const [removed] = newItems.splice(result.source.index, 1)
      newItems.splice(result.destination.index, 0, removed)
      setOrderedNoteIds(newItems)
    },
    [orderedNoteIds],
  )

  return {
    orderedNoteIds,
    onDragEnd,
  }
}
