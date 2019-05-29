import React from 'react'
import posed from 'react-pose'
import Loading from '../../components/Loading/Loading'
import ListItems from '../../components/ListItems/ListItems'

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

const AnimationLoading = posed.div({
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
})

export default class Game extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      items: [
        {
          name: 'Poke'
        },
        {
          name: 'Poke2'
        },
        {
          name: 'Poke3'
        },
        {
          name: 'Poke4'
        },
        {
          name: 'Poke5'
        }
      ]
    }
  }

  render () {
    const { loading, items } = this.state

    return (
      <section className='Game'>
        <AnimationLoading pose={loading ? 'visible' : 'hidden'}>
          <Loading />
        </AnimationLoading>
        <AnimationListItems pose={loading ? 'hidden' : 'visible'}>
          <ListItems items={items} />
        </AnimationListItems>
      </section>
    )
  }
}
