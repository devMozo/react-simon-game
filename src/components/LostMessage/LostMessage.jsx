import React from 'react'
import { Link } from 'react-router-dom'

export default ({ location }) => {
  return (
    <section className='LostMessage'>
      <p className='LostMessage__paragraph margin-4-bottom font-extra-light'>
        {' '}
        Sorry, you've lost! Do you wanna try again?{' '}
      </p>
      <Link
        onClick={() => location.reload()}
        className='LostMessage__button--main margin-1-all padding-1-y padding-2-x font-light'
      >
        Yes! Let me try one more time
      </Link>
      <Link
        to={'/'}
        className='LostMessage__button--secondary margin-1-all padding-1-y padding-2-x font-light'
      >
        No.. I'm tired
      </Link>
    </section>
  )
}
