import axios from 'axios'

export const state = {
    articles: [],
    pagination: {
        current_page: 1,
        last_page: 1,
        items: 10
    },
    order: {
        by: null,
        direction: null
    },
    response: {
        status: null,
        message: null,
        errors: null
    },
    article: {
        id: null,
        created_at: null,
        client_name: null,
        client_email: null,
        required_wordcount: null,
        article: null
    }
}

export const getters = {
    paginationButtons( state ) {
        let numberOfButtons = 5
        let start = state.pagination.current_page > Math.round(numberOfButtons / 2) ? state.pagination.current_page - Math.floor(numberOfButtons / 2) : 1        
        let end = Math.min((start + numberOfButtons - 1), state.pagination.last_page)
        let buttons = []

        for (let i = start; i <= end; i++) {
            buttons.push(i)
        }

        return buttons
    }
}

export const actions = {
    getArticles({ state, commit }) {
        axios.get('/api/articles', {
            params: {
                page: state.pagination.current_page,
                items: state.pagination.items,
                orderBy: state.order.by,
                orderDirection: state.order.direction
            }
        })
        .then(response => {
            commit('SET_ARTICLES', response.data)
        })
        .catch(error => {
            commit('SET_RESPONSE', {
                status: error.response.status,
                message: error.response.statusText
            })
        })
    },
    getArticle({ commit }, id) {
        axios.get(`/api/articles/${id}`)
        .then(response => {
            commit('SET_ARTICLE', response.data)
        })
        .catch(error => {
            commit('SET_RESPONSE', {
                status: error.response.status,
                message: error.response.statusText
            })
        })
    },
    storeArticle({ state, commit }) {
        axios.put('/api/articles/store', {
            client_name: state.article.client_name,
            client_email: state.article.client_email,
            required_wordcount: state.article.required_wordcount,
            article: state.article.article
        })
        .then(response => {
            commit('SET_RESPONSE', response.data)

            if (response.data.status == 'success') {
                commit('CLEAR_ARTICLE')
            }
        })
        .catch(error => {
            commit('SET_RESPONSE', {
                status: error.response.status,
                message: error.response.statusText
            })
        })
    },
    updateArticle({ state, commit }) {
        axios.patch(`/api/articles/update/${state.article.id}`, {
            required_wordcount: state.article.required_wordcount,
            article: state.article.article
        })
        .then(response => {
            commit('SET_RESPONSE', response.data)
        })
        .catch(error => {
            commit('SET_RESPONSE', {
                status: error.response.status,
                message: error.response.statusText
            })
        })
    },
    deleteArticle({ commit, dispatch }, id) {
        axios.delete(`/api/articles/delete/${id}`)
        .then(response => {
            commit('SET_RESPONSE', response.data)
            dispatch('getArticles')
        })
        .catch(error => {
            commit('SET_RESPONSE', {
                status: error.response.status,
                message: error.response.statusText
            })
        })
    }
}

export const mutations = {
    SET_ARTICLES(state, articles) {
        state.articles = articles.data
        state.pagination.current_page = articles.meta.current_page
        state.pagination.last_page = articles.meta.last_page
    },
    SET_ARTICLE(state, article) {
        state.article = article.data
    },
    SET_RESPONSE(state, response) {
        state.response.status = response.status
        state.response.message = response.message
        state.response.errors = response.errors
    },
    CLEAR_ARTICLE(state) {
        state.article.id = null
        state.article.created_at = null
        state.article.client_name = null
        state.article.client_email = null
        state.article.required_wordcount = null
        state.article.article = null
    }
}
