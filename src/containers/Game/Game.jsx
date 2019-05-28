import React from 'react'
import posed from 'react-pose'
import Loading from '../../components/Loading/Loading'

const AnimationPose = posed.div({
  hidden: {
    scaleX: 1.2,
    scaleY: 1.2
  },
  visible: {
    scaleX: 1,
    scaleY: 1,
    opacity: 1
  }
})

export default class Game extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isVisible: false
    }
  }

  componentDidMount () {
    this.setState({
      isVisible: true
    })
  }

  render () {
    const { isVisible } = this.state

    return (
      <section className='Game'>
        <AnimationPose pose={isVisible ? 'visible' : 'hidden'}>
          <Loading />
        </AnimationPose>
      </section>
    )
  }
}
