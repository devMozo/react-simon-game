import React from 'react'
import LinkButton from '../LinkButton/LinkButton'

export default ({ location }) => {
  return (
    <section className='WinMessage'>
      <p className='WinMessage__paragraph margin-4-bottom font-extra-light'>
        {' '}
        Congratulations! You're the chosen one!{' '}
      </p>
      <LinkButton
        onClick={() => location.reload()}
        className='margin-1-all padding-1-y padding-2-x font-light'
        message={'Yes, I know, let me try again'}
      />
      <LinkButton
        to={'/'}
        className='margin-1-all padding-1-y padding-2-x font-light'
        message={'Go Home'}
      />
    </section>
  )
}
