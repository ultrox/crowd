import React from 'react'
import {GenericStyles, AppWrapper, MainWrapper} from 'src/styles'
import {Main} from 'src/styles/layout'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
} from 'react-router-dom'
import ShortLink from './ShortLink'

function App() {
  const [appName, setAppName] = React.useState('')
  React.useEffect(() => {
    fetch(process.env.REACT_APP_API)
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
                  Connection successuful with {appName}
                  <ShortLink />
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
