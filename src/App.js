import React from 'react'
import {GenericStyles} from 'src/styles'
import './App.css'
import ShortLink from './ShortLink'

function App() {
  const [appName, setAppName] = React.useState('')
  React.useEffect(() => {
    fetch(process.env.REACT_APP_API)
      .then(res => res.json())
      .then(data => setAppName(data.name))
  }, [])
  return (
    <div>
      <GenericStyles />
      <ShortLink />
    </div>
  )
}

export default App
