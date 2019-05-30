import ItemAPI from '../index'
import { URL_BREWERY_API } from '../config'
import axios from 'axios'

export default function () {
  return axios
    .get(URL_BREWERY_API)
    .then(response => response.data)
    .then(data => {
      if (data) {
        return data.map(item => {
          const BreweryAPIAdapter = new ItemAPI()
          BreweryAPIAdapter.setName(item.name)

          return BreweryAPIAdapter
        })
      } else {
        throw Error('There are not Breweries')
      }
    })
}
