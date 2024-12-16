// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mergeRefs<T = any>(
  refs: (React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null)[]
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref !== null && ref !== undefined) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
