import React from 'react'
import posed from 'react-pose'
import Loading from '../../components/Loading/Loading'
import ListItems from '../../components/ListItems/ListItems'
import ErrorFetch from '../../components/ErrorFetch/ErrorFetch'
import { connect } from 'react-redux'
import {
  fetchItems,
  addToSequency,
  gameWin,
  gameOver
} from '../../actions/GameAction/index'
import GameContext from '../../contexts/GameContext'
import { TIME_PER_ROUND, MAX_ROUNDS } from '../../constants/rules'
import LostMessage from '../../components/LostMessage/LostMessage'
import WinMessage from '../../components/WinMessage/WinMessage'

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
      userTime: false,
      userSequency: []
    }
  }

  * generatorItems () {
    const { sequency } = this.props
    let i = 0

    while (i < sequency.length) {
      // If the last item was the same as the current item
      if (i > 0 && sequency[i].getID() === sequency[i - 1].getID()) {
        yield STOP_ANIMATION
      }

      yield sequency[i]
      i++
    }
  }

  startRound () {
    const { addToSequency } = this.props
    const items = this.generatorItems()

    let round = setInterval(() => {
      const value = items.next().value

      if (value) {
        this.setState({
          activeItemID: value === STOP_ANIMATION ? undefined : value.getID()
        })
      } else {
        clearInterval(round)
        addToSequency()
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

  onItemClick (item) {
    const { sequency, gameOver } = this.props
    const { userTime, userSequency } = this.state

    if (userTime) {
      // Get every ID of the selected items by the user
      const userSequencyTemp = [...userSequency, item]
      const mappingIdUserSequency = userSequencyTemp.map(item => item.getID())
      // Get every ID of the sequency until the position of the userSequency
      const mappingIdSequency = sequency.map(item => item.getID())

      if (mappingIdSequency.join().startsWith(mappingIdUserSequency.join())) {
        const isTheLast = userSequencyTemp.length + 1 === sequency.length

        this.setState({
          userTime: !isTheLast,
          userSequency: isTheLast ? [] : userSequencyTemp
        })
      } else {
        gameOver()
      }
    }
  }

  static getDerivedStateFromProps (props, state) {
    const { sequency } = props

    if (sequency.length === 1 && props.sequency[0]) {
      state = {
        activeItemID: props.sequency[0].getID(),
        freezed: true,
        userTime: false,
        userSequency: []
      }
    }

    return state
  }

  componentDidMount () {
    this.getItems()
  }

  componentDidUpdate () {
    const { done, sequency, gameWin } = this.props
    const { freezed, userTime } = this.state

    if (!done && !freezed && !userTime) {
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
    const { items, errors, loading, done, win, location } = this.props
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
        <AnimationListItems pose={loading || done ? 'hidden' : 'visible'}>
          <GameContext.Provider
            value={{
              activeItemID,
              freezed,
              onItemClick: item => this.onItemClick(item)
            }}
          >
            <ListItems items={items} />
          </GameContext.Provider>
        </AnimationListItems>
        {!done && userTime && (
          <p className='Game__help margin-3-top font-extra-light'>
            {' '}
            Your turn{' '}
          </p>
        )}
        {!done && !userTime && (
          <p className='Game__help margin-3-top font-extra-light'> My turn </p>
        )}
        {done && win && <WinMessage location={location} />}
        {done && !win && <LostMessage location={location} />}
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
    addToSequency: () => {
      dispatch(addToSequency())
    },
    gameWin: () => {
      dispatch(gameWin())
    },
    gameOver: () => {
      dispatch(gameOver())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
