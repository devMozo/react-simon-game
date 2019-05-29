export default function ItemAPI () {
  // Unique ID
  const id =
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  let name = ''

  const setName = newName => {
    name = newName
  }

  const getName = () => {
    return name
  }

  const getID = () => {
    return id
  }

  return {
    setName,
    getName,
    getID
  }
}
