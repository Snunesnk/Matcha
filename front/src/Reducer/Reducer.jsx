import { PossibleState } from "../constants";

export const reducer = (state, action) => {
    if (action.type === state.currentState)
        return state;

    switch (action.type) {
        case PossibleState.landingPage:
            return {
                ...state,
                currentState: PossibleState.landingPage,
                navbarClass: "visible",
                landingClass: "visible",
                onboardingClass: "hidden",
                dashboardClass: "hidden",
            };

        case PossibleState.onboarding:
            return {
                ...state,
                currentState: PossibleState.onboarding,
                navbarClass: "hidden",
                landingClass: "hidden",
                onboardingClass: "visible",
                dashboardClass: "hidden",
            };

        case PossibleState.onboarding:
            return {
                ...state,
                currentState: PossibleState.onboarding,
                navbarClass: "hidden",
                landingClass: "hidden",
                onboardingClass: "hidden",
                dashboardClass: "visible",
            };

        case "user:updateUserInfos":
            console.log(action);
            return {
                ...state,
                user: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    username: action.payload.username,
                    email: action.payload.email,
                    password: action.payload.password
                }
            }

        default:
            console.log("Error: No such method in reducer")
            throw new Error();
    }
}
