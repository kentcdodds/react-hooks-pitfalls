import './bg'
import './styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Link} from '@reach/router'
import HiddenBug from './1-hidden-bug'
import RevealedBug from './2-revealed-bug'
import FixedVersion from './3-fixed-version'
import {getDogs} from './dogs'

function DogList() {
  const [dogs, setDogs] = React.useState(null)
  React.useEffect(() => {
    getDogs().then(d => setDogs(d))
  }, [])
  if (!dogs) {
    return null
  }
  return (
    <div>
      <h2>Pick a dog</h2>
      <ul>
        {dogs.map(d => (
          <li key={d.id}>
            <Link to={d.id}>{d.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Apps = [HiddenBug, RevealedBug, FixedVersion]

function App() {
  const [selection, setSelection] = React.useState(0)
  const DogInfo = Apps[selection]
  const renderNavLink = (index, content) => (
    <li>
      <button
        className={`nav-link ${selection === index ? 'active' : ''}`}
        onClick={() => setSelection(index)}
      >
        {content}
      </button>
    </li>
  )
  return (
    <div style={{height: 700, padding: '30px 30px'}}>
      <h1 style={{textAlign: 'center'}}>Dogs and Dependencies</h1>
      <ul style={{listStyle: 'none', padding: 0}}>
        {renderNavLink(0, 'Hidden Bug')}
        {renderNavLink(1, 'Revealed Bug')}
        {renderNavLink(2, 'FixedVersion')}
      </ul>
      <hr />
      {DogInfo ? (
        <Router>
          <DogList path="/" />
          <DogInfo path="/:dogId" />
        </Router>
      ) : (
        'Choose a version'
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
