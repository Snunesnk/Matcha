import { redirect } from 'react-router-dom'

export const checkIfLogged = (store) => {
    const userStatus = store.getState().userState.userStatus

    if (userStatus.onboarded) return redirect('/dashboard')
    if (userStatus.verified) return redirect('/onboarding/welcome')
    if (userStatus.loggedIn) return redirect('/onboarding/validation')
}
export const checkIfVerified = (store) => {
    const userStatus = store.getState().userState.userStatus

    if (userStatus.onboarded) return redirect('/dashboard')
    if (userStatus.verified) return redirect('/onboarding/welcome')
}
export const checkIfOnboarded = (store) => {
    const userStatus = store.getState().userState.userStatus

    if (userStatus.onboarded) return redirect('/dashboard')
}
