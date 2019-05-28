// import ItemAPI from '../index'
// import { URL_POKE_API } from './config'

// export default function (limit) {
//   return fetch(URL_POKE_API(limit), { method: 'GET' })
//     .then(response => response.json())
//     .then(data => {
//       if (data.results) {
//         return data.results.map(item => {
//           const PokeAPIAdapter = new ItemAPI()
//           PokeAPIAdapter.setName(item.name)

//           return PokeAPIAdapter
//         })
//       } else {
//         throw Error('There are not Pokemons')
//       }
//     })
//     .catch(err => console.log(err))
// }
