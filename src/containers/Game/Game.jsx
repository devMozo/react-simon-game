import React from 'react'
import posed from 'react-pose'
import Loading from '../../components/Loading/Loading'
import ListItems from '../../components/ListItems/ListItems'
import ErrorFetch from '../../components/ErrorFetch/ErrorFetch'
import { connect } from 'react-redux'
import {
  fetchItems,
  sequencyAdd,
  gameWin
} from '../../actions/GameAction/index'
import GameContext from '../../contexts/GameContext'
import { TIME_PER_ROUND, MAX_ROUNDS } from '../../constants/rules'

const STOP_ANIMATION = 'STOP_ANIMATION'
const AnimationListItems = posed.div({
  hidden: {
    scaleX: 1.2,
    scaleY: 1.2,
    opacity: 0
  },
  visible: {
    scaleX: 1,
    scaleY: 1,
    opacity: 1
  }
})

const AnimationFade = posed.div({
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
})

class Game extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      activeItemID: undefined,
      freezed: false,
      userTime: false
    }
  }

  * generatorItems () {
    const { sequency } = this.props
    let i = 0

    while (i < sequency.length) {
      if (i > 0 && sequency[i].getID() === sequency[i - 1].getID()) {
        yield STOP_ANIMATION
      }

      yield sequency[i]
      i++
    }
  }

  startRound () {
    const { sequencyAdd } = this.props
    const items = this.generatorItems()

    let round = setInterval(() => {
      const value = items.next().value

      if (value) {
        this.setState({
          activeItemID: value === STOP_ANIMATION ? undefined : value.getID()
        })
      } else {
        clearInterval(round)
        sequencyAdd()
        this.setState({
          activeItemID: undefined,
          freezed: false,
          userTime: true
        })
      }
    }, TIME_PER_ROUND)
  }

  getItems () {
    this.props.fetchItems()
  }

  componentDidMount () {
    this.getItems()
  }

  componentDidUpdate () {
    const { done, items, sequency, gameWin } = this.props
    const { freezed, userTime } = this.state

    if (!done && !freezed && !userTime && items.length > 0) {
      this.setState({
        freezed: true
      })

      if (sequency.length <= MAX_ROUNDS) {
        this.startRound()
      } else {
        gameWin()
      }
    }
  }

  render () {
    const { items, errors, loading } = this.props
    const { activeItemID, freezed, userTime } = this.state

    return (
      <section className='Game'>
        <AnimationFade
          className='margin-4-top'
          pose={errors.fetch ? 'visible' : 'hidden'}
        >
          <ErrorFetch onRetry={() => this.getItems()} />
        </AnimationFade>
        <AnimationFade pose={loading ? 'visible' : 'hidden'}>
          <Loading />
        </AnimationFade>
        <AnimationListItems pose={loading ? 'hidden' : 'visible'}>
          <GameContext.Provider
            value={{
              activeItemID,
              freezed
            }}
          >
            <ListItems items={items} />
          </GameContext.Provider>
        </AnimationListItems>
        {userTime && (
          <p className='Game__help margin-3-top font-extra-light'>
            {' '}
            Your turn{' '}
          </p>
        )}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.GameReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () => {
      dispatch(fetchItems())
    },
    sequencyAdd: () => {
      dispatch(sequencyAdd())
    },
    gameWin: () => {
      dispatch(gameWin())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
