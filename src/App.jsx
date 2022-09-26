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
  navbarClass: "visible",
  landingClass: "visible",
  OnboardingClass: "hidden",

  user: {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const providerState = {
    state,
    dispatch
  }

  return (
    <StoreContext.Provider value={providerState}>
      <Navbar navbarClass={state.navbarClass}></Navbar>
      <Landing landingClass={state.landingClass}></Landing>
      <Onboarding OnboardingClass={state.OnboardingClass}></Onboarding>
    </StoreContext.Provider >
  )
}

export default App
