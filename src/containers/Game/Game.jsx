import React from 'react'
import posed from 'react-pose'
import Loading from '../../components/Loading/Loading'
import ListItems from '../../components/ListItems/ListItems'
import ErrorFetch from '../../components/ErrorFetch/ErrorFetch'
import { connect } from 'react-redux'
import { fetchItems } from '../../actions/GameAction/index'

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
  getItems () {
    this.props.fetchItems()
  }

  componentDidMount () {
    this.getItems()
  }

  componentDidUpdate () {
    const { items } = this.props

    if (items.length > 0) {
      this.setState({
        loading: false
      })
    }
  }

  render () {
    const { items, errors, loading } = this.props

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
          <ListItems items={items} />
        </AnimationListItems>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
