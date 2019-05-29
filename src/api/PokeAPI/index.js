import ItemAPI from '../index'
import { URL_POKE_API } from '../config'
import axios from 'axios'

export default function (limit) {
  return axios
    .get(URL_POKE_API(limit))
    .then(response => response.data)
    .then(data => {
      const { results } = data

      if (results) {
        return results.map(item => {
          const PokeAPIAdapter = new ItemAPI()
          PokeAPIAdapter.setName(item.name)

          return PokeAPIAdapter
        })
      } else {
        throw Error('There are not Pokemons')
      }
    })
}
