import ItemAPI from '../index'
import { URL_RICK_AND_MORTY_API } from '../config'
import axios from 'axios'

export default function () {
  return axios
    .get(URL_RICK_AND_MORTY_API)
    .then(response => response.data)
    .then(data => {
      if (data.results) {
        return data.results.map(item => {
          const RickAndMortyAPIAdapter = new ItemAPI()
          RickAndMortyAPIAdapter.setName(item.name)

          return RickAndMortyAPIAdapter
        })
      } else {
        throw Error('There are not characters')
      }
    })
}
