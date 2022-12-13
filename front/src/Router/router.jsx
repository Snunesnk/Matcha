import {
    createBrowserRouter,
} from "react-router-dom";

// Main pages
import Landing from '../Pages/Landing/Landing'
import Onboarding from '../Pages/Onboarding/Onboarding'
import Dashboard from "../Pages/Dashboard/Dashboard";

// Error page
import ErrorPage from "../Pages/ErrorPage";

// Onboarding children
import SignupForm, { action as signupAction } from "../Components/OnboardingFormComponents/SignupForm";
import EmailValidation from "../Components/OnboardingFormComponents/EmailValidation";
import WelcomeMessage from "../Components/OnboardingFormComponents/WelcomeMessage";
import GenderSelection from "../Components/OnboardingFormComponents/GenderSelection";
import SexualPreferences from "../Components/OnboardingFormComponents/SexualPreference";
import DescriptionCreation from "../Components/OnboardingFormComponents/DescriptionCreation";
import InterestsTags from "../Components/OnboardingFormComponents/InterestsTags";
import PicturesUploading from "../Components/OnboardingFormComponents/PicturesUploading";
import AllSetMessage from "../Components/OnboardingFormComponents/AllSetMessage";


const router = createBrowserRouter([
    {
        path: "/*",
        element: <Landing />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/onboarding/*",
        element: <Onboarding />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "signup",
                element: <SignupForm />,
                action: signupAction,
                errorElement: <ErrorPage />,
            },
            {
                path: "validation",
                element: <EmailValidation />,
                errorElement: <ErrorPage />,
            },
            {
                path: "welcome",
                element: <WelcomeMessage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "gender",
                element: <GenderSelection />,
                errorElement: <ErrorPage />,
            },
            {
                path: "preferences",
                element: <SexualPreferences />,
                errorElement: <ErrorPage />,
            },
            {
                path: "bio",
                element: <DescriptionCreation />,
                errorElement: <ErrorPage />,
            },
            {
                path: "interests",
                element: <InterestsTags />,
                errorElement: <ErrorPage />,
            },
            {
                path: "pictures",
                element: <PicturesUploading />,
                errorElement: <ErrorPage />,
            },
            {
                path: "done",
                element: <AllSetMessage />,
                errorElement: <ErrorPage />,
            },
        ]
    },
    {
        path: "/dashboard/*",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
    },
]);

export default router;