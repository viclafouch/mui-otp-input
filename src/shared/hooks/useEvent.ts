import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any

export function useEvent<T extends AnyFunction>(callback?: T): T {
  const ref = React.useRef<AnyFunction | undefined>(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  React.useInsertionEffect(() => {
    ref.current = callback
  })

  return React.useCallback<AnyFunction>((...args) => {
    return ref.current?.(...args)
  }, []) as T
}
