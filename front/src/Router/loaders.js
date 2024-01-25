import { redirect } from 'react-router-dom'
import ApiService from '../Services/api.service'

const checkAuthStatus = async () => {
    return ApiService.get('/auth/validate').catch(() => {
        return redirect('/login')
    })
}

export const emailValidationLoader = async () => {
    const userStatus = await checkAuthStatus()

    if (!userStatus.loggedIn || !userStatus.verified) return null
    if (userStatus.onboarded) return redirect('/dashboard')
    else return redirect('/onboarding/welcome')
}

export const loginLoader = async () => {
    const userStatus = await checkAuthStatus()

    if (!userStatus.loggedIn) return null
    if (!userStatus.verified) return redirect('/validation')
    if (!userStatus.onboarded) return redirect('/onboarding/welcome')
    else return redirect('/dashboard')
}

export const onboardingLoader = async () => {
    const userStatus = await checkAuthStatus()

    if (!userStatus.loggedIn) return redirect('/login')
    if (!userStatus.verified) return redirect('/validation')
    if (userStatus.onboarded) return redirect('/dashboard')

    return null
}

export const dashboardLoader = async () => {
    const userStatus = await checkAuthStatus()

    if (!userStatus.loggedIn) return redirect('/login')
    if (!userStatus.verified) return redirect('/validation')
    if (!userStatus.onboarded) return redirect('/onboarding/welcome')

    return null
}

export const redirectToWelcome = () => {
    return redirect('/onboarding/welcome')
}

export const redirectToMatching = () => {
    return redirect('/dashboard')
}

export const redirectToLogin = () => {
    return redirect('/login')
}
