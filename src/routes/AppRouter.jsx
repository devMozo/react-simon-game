import React from 'react'
import posed, { PoseGroup } from 'react-pose'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from '../containers/Home/Home'
import Game from '../containers/Game/Game'

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0, delay: 300 }
})

export default class AppRouter extends React.PureComponent {
  render () {
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <PoseGroup>
              <RouteContainer key={location.pathname}>
                <Switch location={location}>
                  <Route exact path='/' component={Home} key='home' />
                  <Route path='/game' component={Game} key='game' />
                </Switch>
              </RouteContainer>
            </PoseGroup>
          )}
        />
      </BrowserRouter>
    )
  }
}
