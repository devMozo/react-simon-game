import React from 'react'
import { Link } from 'react-router-dom'

export default ({ location }) => {
  return (
    <section className='WinMessage'>
      <p className='WinMessage__paragraph margin-4-bottom font-extra-light'>
        {' '}
        Congratulations! You're the chosen one!{' '}
      </p>
      <Link
        onClick={() => location.reload()}
        className='WinMessage__button--main margin-1-all padding-1-y padding-2-x font-light'
      >
        Yes, I know, let me try again
      </Link>
      <Link
        to={'/'}
        className='WinMessage__button--secondary margin-1-all padding-1-y padding-2-x font-light'
      >
        Go Home
      </Link>
    </section>
  )
}
