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
                onBoardingClass: "hidden",
            };

        case PossibleState.onboarding:
            return {
                ...state,
                currentState: PossibleState.onboarding,
                navbarClass: "hidden",
                landingClass: "hidden",
                onBoardingClass: "visible",
            };

        default:
            throw new Error();
    }
}
