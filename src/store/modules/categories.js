import firebase from 'firebase/app'
import 'firebase/database'

export default {
  namespaced: true,
  state: {
    items: {}
  },

  getters: {},

  actions: {
    fetchAllCategories({ state, commit }) {
      return new Promise(resolve => {
        firebase
          .database()
          .ref('categories')
          .once('value', snapshot => {
            const categoriesObject = snapshot.val()
            Object.keys(categoriesObject).forEach(categoryId => {
              const category = categoriesObject[categoryId]
              commit(
                'setItem',
                {
                  resource: 'categories',
                  id: categoryId,
                  item: category
                },
                { root: true }
              )
            })
            resolve(Object.values(state.items))
          })
      })
    },

    fetchCategory: ({ dispatch }, { id }) =>
      dispatch(
        'fetchItem',
        { resource: 'categories', id, emoji: '🏷' },
        { root: true }
      ),

    fetchCategories: ({ dispatch }, { ids }) =>
      dispatch(
        'fetchItems',
        { resource: 'categories', ids, emoji: '🏷' },
        { root: true }
      )
  },

  mutations: {}
}
