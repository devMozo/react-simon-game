import React from 'react'
import { Link } from 'react-router-dom'

export default ({
  to = undefined,
  onClick,
  className = '',
  message,
  secondary
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`LinkButton${secondary ? '--secondary' : ''} ${className}`}
    >
      {message}
    </Link>
  )
}
