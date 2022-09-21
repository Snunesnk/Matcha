import { PossibleState } from "../constants";

export const reducer = (state, action) => {
    if (action.type === state.currentState)
        return state;

    switch (action.type) {
        case PossibleState.landingPage:
            return {
                ...state,
                currentState: PossibleState.landingPage,
                landingClass: "visible",
                onBoardingClass: "hidden",
            };

        case PossibleState.onboarding:
            return {
                ...state,
                currentState: PossibleState.onboarding,
                landingClass: "hidden",
                onBoardingClass: "visible",
            };

        default:
            throw new Error();
    }
}
