class Store {
  constructor(reducer, initialState) {
    this.state = initialState
    this.reducer = reducer
    this.subscribeFunction = null
  }

  dispatch(action) {
    const prevState = this.state
    const newState = this.reducer(this.state, action)
    this.state = { ...prevState, ...newState }
    console.log(this.state)
    if (
      JSON.stringify(prevState) !== JSON.stringify(this.state) &&
      this.subscribeFunction
    ) {
      this.subscribeFunction()
    }
  }

  getState() {
    return this.state
  }

  subscribe(fn) {
    this.subscribeFunction = fn
  }
}

const createStore = (reducer) => {
  return new Store(reducer)
}

export default createStore
