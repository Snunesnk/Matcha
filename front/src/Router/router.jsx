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
import Root from '../Pages/Root/Root'
import EmailVerify from '../Components/OnboardingFormComponents/EmailVerify'
import {
    dashboardLoader,
    emailValidationLoader,
    loginLoader,
    onboardingLoader,
    redirectToLogin,
    redirectToMatching,
    redirectToWelcome,
} from './loaders'
import MessagesContainer from '../Components/MessagesContainer/MessagesContainer'
import UserSettings from '../Components/Settings/UserSettings'
import DiscoverySettings from '../Components/Settings/DiscoverySettings'
import Notifications from '../Components/Notifications/Notifications'
import ProfileMatching from '../Components/ProfileMatching'
import LoginPage, { action as loginAction } from '../Pages/Login/Login'
import ResetPasswordPage from '../Pages/ResetPassword/ResetPassword'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Landing />,
            },
            {
                path: 'login',
                element: <LoginPage />,
                action: loginAction,
                loader: loginLoader,
            },
            {
                path: 'password-reset',
                element: <ResetPasswordPage />,
            },
            {
                path: 'signup',
                element: <SignupForm />,
                action: signupAction,
                loader: loginLoader,
            },
            {
                path: 'validation',
                element: <EmailValidation />,
                loader: emailValidationLoader,
            },
            {
                path: 'verify',
                element: <EmailVerify />,
                loader: emailValidationLoader,
            },
            {
                path: 'onboarding/*',
                element: <Onboarding />,
                loader: onboardingLoader,
                children: [
                    {
                        path: '',
                        element: <></>,
                        loader: redirectToWelcome,
                    },
                    {
                        path: 'welcome',
                        element: <WelcomeMessage />,
                    },
                    {
                        path: 'gender',
                        element: <GenderSelection />,
                    },
                    {
                        path: 'preferences',
                        element: <SexualPreferences />,
                    },
                    {
                        path: 'bio',
                        element: <DescriptionCreation />,
                    },
                    {
                        path: 'interests',
                        element: <InterestsTags />,
                    },
                    {
                        path: 'pictures',
                        element: <PicturesUploading />,
                    },
                    {
                        path: 'done',
                        element: <AllSetMessage />,
                    },
                    {
                        path: '*',
                        element: <></>,
                        loader: redirectToWelcome,
                    },
                ],
            },
            {
                path: 'dashboard/*',
                element: <Dashboard />,
                loader: dashboardLoader,
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
                    {
                        path: 'discoverySettings',
                        element: <DiscoverySettings />,
                    },
                    {
                        path: 'notifications',
                        element: <Notifications />,
                    },
                    {
                        path: '*',
                        element: <></>,
                        loader: redirectToMatching,
                    },
                ],
            },
            {
                path: '*',
                element: <></>,
                loader: redirectToLogin,
            },
        ],
    },
])

export default router
