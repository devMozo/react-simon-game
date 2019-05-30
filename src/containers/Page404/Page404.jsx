import React from 'react'
import LinkButton from '../../components/LinkButton/LinkButton'

export default () => {
  return (
    <section className='Page404'>
      <p className='Page404__paragraph margin-4-y font-extra-light'>
        {' '}
        Sorry, you are in the wrong place, but anyway... do you wanna play a
        game?{' '}
      </p>
      <LinkButton
        to={'/'}
        className='margin-1-all padding-1-y padding-2-x font-light'
        message={'Yes! Let me see!'}
      />
    </section>
  )
}
