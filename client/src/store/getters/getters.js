export default {
  fullName (state) {
    console.log(state)
    return state.firstName + ' ' + state.lastName
  }
}
