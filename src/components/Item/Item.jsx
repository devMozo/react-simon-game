import React from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'

const AnimationListItems = posed.div({
  zoomIn: {
    scaleX: 1.1,
    scaleY: 1.1
  },
  normal: {
    scaleX: 1,
    scaleY: 1
  }
})

const AnimationName = posed.div({
  displayed: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
})

class Item extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      animated: false
    }
  }

  render () {
    const { inverted, className = '', item } = this.props
    const { animated } = this.state

    return (
      <li
        onMouseOver={() => this.setState({ animated: true })}
        onMouseOut={() => this.setState({ animated: false })}
        className={`Item${inverted ? '--inverted' : ''} ${className}`}
      >
        <AnimationListItems pose={animated ? 'zoomIn' : 'normal'}>
          <div className={`Item__shape ${animated ? 'animated' : ''}`} />
        </AnimationListItems>
        <AnimationName pose={animated ? 'displayed' : 'hidden'}>
          <p className='Item__name font-bold font-capitalize'>
            {' '}
            {item.getName()}{' '}
          </p>
        </AnimationName>
      </li>
    )
  }
}

Item.propTypes = {
  inverted: PropTypes.bool,
  className: PropTypes.string,
  item: PropTypes.object
}

export default Item
