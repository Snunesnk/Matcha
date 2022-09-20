import React from "react";
import { useStoreContext } from "../../Reducer/StoreContext";
import { PossibleState } from "../../constants";
import './MainBtn.css';

const MainButton = ({ text, shadowClass = "" }) => {
    const { state, dispatch } = useStoreContext();

    const goToOnboarding = () => {
        dispatch({ type: PossibleState.onboarding });
    }

    return (
        <div className="grid_item">
            <button id="main_button" onClick={goToOnboarding}>
                <span>{text}</span>
            </button>
            <button disabled id="shadow" className={shadowClass}>
                <span>{text}</span>
            </button>
        </div>
    )
}

export default MainButton;