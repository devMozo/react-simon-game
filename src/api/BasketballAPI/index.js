import ItemAPI from '../index'
import { URL_BASKETBALL_API } from '../config'
import axios from 'axios'

export default function () {
  return axios
    .get(URL_BASKETBALL_API)
    .then(response => response.data)
    .then(data => {
      if (data.data) {
        return data.data.map(item => {
          const BasketballAPIAdapter = new ItemAPI()
          BasketballAPIAdapter.setName(item.last_name)

          return BasketballAPIAdapter
        })
      } else {
        throw Error('There are not players')
      }
    })
}
