// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mergeRefs<T = any>(
  refs: (React.RefObject<T> | React.Ref<T> | undefined | null)[]
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref !== null && ref !== undefined) {
        ref.current = value
      }
    })
  }
}
