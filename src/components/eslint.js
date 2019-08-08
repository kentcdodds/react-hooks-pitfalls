import React from 'react'

// Rules of Hooks
// 1. Loop
// 2. Early return
// 3. Called outside a hook/component
// 4. Called in a callback

// Exhaustive Deps
// 1. useMemo()/useCallback() with no deps
// 2. async useEffect
// 3. ref.current in cleanup
// 4. setState({}) in useEffect()
// 5. dep list that's not an array literal
// 6. spread deps
// 7. literal is not a valid dependency
// 8. complex expressions + eslint is :-(
// 9. Makes deps change every render
// 10. useMemo/useCallback with unnecessary dependencies

function Example({hey}) {
  const [count, setCount] = React.useState(0)
  const [name, setName] = React.useState('')
  const deps = hey.slice(0, 2)
  React.useMemo(() => {
    console.log(name)
  }, [name])
  React.useEffect(() => {}, [deps])
  const increment = () => setCount(c => c + 1)
  return (
    <>
      <label>
        Name: <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <button onClick={increment}>{count}</button>
    </>
  )
}

export default Example
