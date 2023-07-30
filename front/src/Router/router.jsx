import { createBrowserRouter } from 'react-router-dom'

// Main pages
import Landing from '../Pages/Landing/Landing'
import Onboarding from '../Pages/Onboarding/Onboarding'
import Dashboard from '../Pages/Dashboard/Dashboard'

// Error page
import ErrorPage from '../Pages/ErrorPage'

// Onboarding children
import SignupForm, {
    action as signupAction,
} from '../Components/OnboardingFormComponents/SignupForm'
import EmailValidation from '../Components/OnboardingFormComponents/EmailValidation'
import WelcomeMessage from '../Components/OnboardingFormComponents/WelcomeMessage'
import GenderSelection from '../Components/OnboardingFormComponents/GenderSelection'
import SexualPreferences from '../Components/OnboardingFormComponents/SexualPreference'
import DescriptionCreation from '../Components/OnboardingFormComponents/DescriptionCreation'
import InterestsTags from '../Components/OnboardingFormComponents/InterestsTags'
import PicturesUploading from '../Components/OnboardingFormComponents/PicturesUploading'
import AllSetMessage from '../Components/OnboardingFormComponents/AllSetMessage'
import DashboardOverview from '../Components/DashboardOverview'
import ChatComponent from '../Components/ChatComponent'
import Root from '../Pages/Root/Root'
import EmailVerify from '../Components/OnboardingFormComponents/EmailVerify'
import {
    checkIfLogged,
    checkIfOnboarded,
    checkIfVerified,
    redirectToSignup,
} from './loaders'

const getRouterWithStore = (store) => {
    return createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '',
                    element: <Landing />,
                    loader: () => checkIfLogged(store),
                },
                {
                    path: 'onboarding/*',
                    element: <Onboarding />,
                    children: [
                        {
                            path: '',
                            element: <></>,
                            loader: redirectToSignup,
                        },
                        {
                            path: 'signup',
                            element: <SignupForm />,
                            action: signupAction,
                            loader: () => checkIfLogged(store),
                        },
                        {
                            path: 'validation',
                            element: <EmailValidation />,
                            loader: () => checkIfVerified(store),
                        },
                        {
                            path: 'verify',
                            element: <EmailVerify />,
                            loader: () => checkIfLogged(store),
                        },
                        {
                            path: 'welcome',
                            element: <WelcomeMessage />,
                            loader: () => checkIfOnboarded(store),
                        },
                        {
                            path: 'gender',
                            element: <GenderSelection />,
                            loader: () => checkIfOnboarded(store),
                        },
                        {
                            path: 'preferences',
                            element: <SexualPreferences />,
                            loader: () => checkIfOnboarded(store),
                        },
                        {
                            path: 'bio',
                            element: <DescriptionCreation />,
                            loader: () => checkIfOnboarded(store),
                        },
                        {
                            path: 'interests',
                            element: <InterestsTags />,
                            loader: () => checkIfOnboarded(store),
                        },
                        {
                            path: 'pictures',
                            element: <PicturesUploading />,
                            loader: () => checkIfOnboarded(store),
                        },
                        {
                            path: 'done',
                            element: <AllSetMessage />,
                            loader: () => checkIfOnboarded(store),
                        },
                    ],
                },
                {
                    path: 'dashboard/*',
                    element: <Dashboard />,
                    children: [
                        {
                            index: true,
                            element: <ProfileMatching />,
                        },
                        {
                            path: 'messages',
                            element: <MessagesContainer />,
                        },
                        {
                            path: 'userSettings',
                            element: <UserSettings />,
                        },
                    ],
                },
                {
                    path: 'login',
                    element: <LoginPage />,
                },
            ],
        },
    ])
}

export default getRouterWithStore
