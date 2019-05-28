export default function ItemAPI () {
  let name = ''

  const setName = newName => {
    name = newName
  }

  const getName = () => {
    return name
  }

  return {
    setName,
    getName
  }
}
