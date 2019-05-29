import React from 'react'
import Item from '../Item/Item'

export default ({ items, className = '' }) => {
  let inverted = false

  return (
    <ul className={`ListItems padding-0-x full-width ${className}`}>
      {items &&
        items.map((item, key) => {
          const element = (
            <Item
              key={key}
              className='margin-1-x'
              inverted={inverted}
              item={item}
            />
          )
          inverted = !inverted

          return element
        })}
    </ul>
  )
}
