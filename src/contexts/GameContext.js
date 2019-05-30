import React from 'react'

export default React.createContext({
  activeItemID: undefined,
  freezed: false,
  onItemClick: () => {}
})
