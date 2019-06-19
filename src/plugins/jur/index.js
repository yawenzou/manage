import store from 'store'

export default (item) => {
    return store.getters.get_user_info.jur && store.getters.get_user_info.jur.indexOf(item) != '-1'
        // return true
}