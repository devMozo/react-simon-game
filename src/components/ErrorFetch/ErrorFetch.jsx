import React from 'react'

export default ({ onRetry }) => {
  return (
    <button
      onClick={onRetry}
      className='ErrorFetch padding-1-y padding-2-x font-light'
    >
      {' '}
      Try the connection Again{' '}
    </button>
  )
}
