export default class Store {
  constructor(reducer, state = null, subscribeFn = null) {
    this.reducer = reducer
    this.state = state
    this.subscribeFn = subscribeFn
  }

  // Function to create a new store
  static createStore(reducer, state = null, subscribeFn = null) {
    if (typeof reducer === "object") {
      return new Store(...reducer, subscribeFn)
    }
    const initialState = reducer(undefined, { type: null })
    return new Store(reducer, initialState, subscribeFn)
  }

  // Function to combine reducers
  static combineReducers(reducers) {
    const initialState = {}
    for (let reducer in reducers) {
      initialState[reducer] = reducers[reducer](undefined, { type: null })
    }
    return [reducers, initialState]
  }

  // Dispatching actions
  dispatch(action) {
    const prevState = this.state
    let newState

    // If reducer is created through combineReudcers
    if (typeof this.reducer === "object") {
      for (let reducer in this.reducer) {
        const newReducerState = this.reducer[reducer](
          prevState[reducer],
          action
        )

        if (typeof prevState[reducer] === "object") {
          newState = {
            ...newState,
            [reducer]: { ...prevState[reducer], ...newReducerState },
          }
        } else {
          newState = { ...newState, [reducer]: newReducerState }
        }
      }
    }
    // If reducer is a function
    else {
      newState = this.reducer(prevState, action)
    }

    if (typeof this.state === "object") {
      this.state = { ...prevState, ...newState }
    } else {
      this.state = newState
    }

    if (
      JSON.stringify(this.state) !== JSON.stringify(prevState) &&
      this.subscribeFn
    ) {
      this.subscribeFn()
    }
  }

  // Fire when state changes
  subscribe(fn) {
    this.subscribeFn = fn
  }

  // Selector
  selector(fn) {
    return fn(this.state)
  }
}
