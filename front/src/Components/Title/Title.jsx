import React from "react";
import { useStoreContext } from "../../Reducer/StoreContext";
import { PossibleState } from "../../constants";
import './Title.css'

export default Title => {
    const { state, dispatch } = useStoreContext();

    // Here I need to add a check in the reducer, if the user is logged in
    // then I need to redirect it to the main page
    const goToLanding = () => {
        dispatch({ type: PossibleState.landingPage });
    }

    return (
        <div id='title_container'>
            <a onClick={goToLanding}><h1>MatChat</h1></a>
        </div>
    )
}