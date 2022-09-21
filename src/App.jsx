import { useState, useReducer } from 'react'
import './App.css'
import Landing from './Pages/Landing/Landing'
import Navbar from './Components/Navbar/Navbar'
import Onboarding from './Components/Onboarding/Onboarding'
import { PossibleState } from './constants'
import StoreContext from './Reducer/StoreContext'
import { reducer } from './Reducer/Reducer'

const defaultState = {
  currentState: PossibleState.landingPage,
  landingClass: "visible",
  onBoardingClass: "hidden",
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const providerState = {
    state,
    dispatch
  }

  if (state.currentState === PossibleState.landingPage)

    return (
      <StoreContext.Provider value={providerState}>
        <Navbar></Navbar>
        <Landing landingClass={state.landingClass}></Landing>
        <Onboarding onBoardingClass={state.onBoardingClass}></Onboarding>
      </StoreContext.Provider >
    )
}

export default App
