import React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children, options}) {
  const tiltRef = React.useRef()
  React.useEffect(() => {
    const {current: tiltNode} = tiltRef
    VanillaTilt.init(tiltNode, options)
    return () => tiltNode.vanillaTilt.destroy()
  })

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  const [max, setMax] = React.useState(25)
  const [speed, setSpeed] = React.useState(400)
  const [maxGlare, setMaxGlare] = React.useState(0.5)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{width: 300, marginBottom: 40}}>
        <label style={{display: 'block'}}>
          Max: {max}{' '}
          <input
            value={max}
            onChange={e => Number(setMax(e.target.value))}
            type="range"
            max={100}
            min={10}
          />
        </label>
        <label style={{display: 'block'}}>
          Speed: {speed}{' '}
          <input
            value={speed}
            onChange={e => Number(setSpeed(e.target.value))}
            type="range"
            max={2000}
            min={100}
          />
        </label>
        <label style={{display: 'block'}}>
          Glare: {maxGlare}{' '}
          <input
            value={maxGlare}
            onChange={e => Number(setMaxGlare(e.target.value))}
            type="range"
            step={0.1}
            max={1}
            min={0}
          />
        </label>
      </div>
      <Tilt
        options={{
          max,
          speed,
          glare: maxGlare !== 0,
          'max-glare': maxGlare,
        }}
      >
        <div className="totally-centered">vanilla-tilt.js</div>
      </Tilt>
    </div>
  )
}

export default App
