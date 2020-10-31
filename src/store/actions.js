import firebase from 'firebase/app'
import 'firebase/database'

export default {
  fetchItem({ state, commit }, { id, resource }) {
    return new Promise(resolve => {
      firebase
        .database()
        .ref(resource)
        .child(id)
        .once('value', snapshot => {
          commit('setItem', {
            resource,
            id: snapshot.key,
            item: snapshot.val()
          })
          resolve(state[resource].items[id])
        })
    })
  },

  fetchItems({ dispatch }, { ids, resource, emoji }) {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
    return Promise.all(
      ids.map(id => dispatch('fetchItem', { id, resource, emoji }))
    )
  }
}
