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
import EmailValidated from '../Components/OnboardingFormComponents/EmailValidated'

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
                path: 'onboarding/*',
                element: <Onboarding />,
                children: [
                    {
                        path: 'signup',
                        element: <SignupForm />,
                        action: signupAction,
                    },
                    {
                        path: 'validation',
                        element: <EmailValidation />,
                    },
                    {
                        path: 'validated',
                        element: <EmailValidated />,
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
                ],
            },
            {
                path: 'dashboard/*',
                element: <Dashboard />,
                children: [
                    {
                        index: true,
                        element: <DashboardOverview />,
                    },
                    {
                        path: 'messages/:id',
                        element: <ChatComponent />,
                    },
                ],
            },
        ],
    },
])

export default router
