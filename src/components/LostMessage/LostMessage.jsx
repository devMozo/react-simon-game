import React from 'react'
import LinkButton from '../LinkButton/LinkButton'

export default ({ location }) => {
  return (
    <section className='LostMessage'>
      <p className='LostMessage__paragraph margin-4-bottom font-extra-light'>
        {' '}
        Sorry, you've lost! Do you wanna try again?{' '}
      </p>
      <LinkButton
        onClick={() => location.reload()}
        className='margin-1-all padding-1-y padding-2-x font-light'
        message={'Yes! Let me try one more time'}
      />
      <LinkButton
        to={'/'}
        className='margin-1-all padding-1-y padding-2-x font-light'
        message={"No.. I'm tired"}
      />
    </section>
  )
}
