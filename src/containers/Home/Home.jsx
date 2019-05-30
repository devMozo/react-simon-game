import React from 'react'
import posed from 'react-pose'
import LinkButton from '../../components/LinkButton/LinkButton'
import { connect } from 'react-redux'

const AnimationPose = posed.div({
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

class Home extends React.PureComponent {
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
      <section className='Home'>
        <AnimationPose pose={isVisible ? 'visible' : 'hidden'}>
          <h2 className='Home__title padding-8-top margin-0-top margin-4-bottom font-extra-light'>
            {' '}
            Welcome to the most complicated game that you've ever played{' '}
          </h2>

          <LinkButton
            onClick={() => {
              this.setState({
                isVisible: false
              })
            }}
            to='/game'
            className='padding-1-y padding-2-x font-light'
            message={'Are you ready?'}
          />
        </AnimationPose>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
