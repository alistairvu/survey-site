export default class Store {
  constructor(reducer, initialState = null, subscribeFunction = null) {
    this.reducer = reducer
    this.state = initialState
    this.subscribeFunction = subscribeFunction
  }

  static createStore = (
    reducer,
    initialState = null,
    subscribeFunction = null
  ) => {
    return new Store(reducer, initialState, subscribeFunction)
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
