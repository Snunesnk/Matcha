import { useState, useReducer } from 'react'
import './App.css'
import MainBtn from './Components/MainButton/MainBtn'
import Navbar from './Components/Navbar/Navbar'
import Onboarding from './Components/Onboarding/Onboarding'
import { PossibleState } from './constants'
import StoreContext from './Reducer/StoreContext'
import { reducer } from './Reducer/Reducer'

function App() {
  const [state, dispatch] = useReducer(reducer, PossibleState.landingPage);

  const providerState = {
    state,
    dispatch
  }

  return (
    <StoreContext.Provider value={providerState}>
      <Navbar></Navbar>
      {
        state === PossibleState.landingPage &&
        (
          <MainBtn></MainBtn>
        )
      }

      {
        state === PossibleState.onboarding &&
        (
          <Onboarding></Onboarding>
        )
      }
    </StoreContext.Provider >
  )
}

export default App
