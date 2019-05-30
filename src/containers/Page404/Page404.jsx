import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <section className='Page404'>
      <p className='Page404__paragraph margin-4-y font-extra-light'>
        {' '}
        Sorry, you are in the wrong place, but anyway... do you wanna play a
        game?{' '}
      </p>
      <Link
        to={'/'}
        className='Page404__button--main margin-1-all padding-1-y padding-2-x font-light'
      >
        Yes! Let me see!
      </Link>
    </section>
  )
}
