import React from 'react'
import logo from './logo.svg'
import {GenericStyles, AppWrapper, MainWrapper} from 'src/styles'
import {Main} from 'src/styles/layout'
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
} from 'react-router-dom'

function App() {
  const [appName, setAppName] = React.useState('')
  React.useEffect(() => {
    const result = fetch(process.env.REACT_APP_API)
      .then(res => res.json())
      .then(data => setAppName(data.name))
  }, [])
  return (
    <Router>
      <AppWrapper>
        <GenericStyles />
        <MainWrapper>
          <Switch>
            <Route exact path="/">
              <Main>
                <div className="App">
                  <header className="App-header">
                    <h2 style={{color: 'white'}}>
                      Connection successuful with {appName}
                    </h2>
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                      Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <Link to="/123">Go to Random Page</Link>
                    <a
                      className="App-link"
                      href="https://reactjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn React
                    </a>
                  </header>
                </div>
              </Main>
            </Route>
            <Route path="/:id">
              <div>
                <RandomDetails />
              </div>
            </Route>
          </Switch>
        </MainWrapper>
      </AppWrapper>
    </Router>
  )
}

function RandomDetails() {
  let {id} = useParams()

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  )
}
export default App
