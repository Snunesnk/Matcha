import { Grid } from "@mui/material";
import "../Onboarding.css"
import { useStoreContext } from "../../../Reducer/StoreContext";

const EmailValidation = () => {
    const { state, dispatch } = useStoreContext();

    return (
        <Grid container item id="onboarding_email_validation">
            <p>
                <span>MatChat</span>
                <br />
                <span>We sent an email to <b>{state.user.email}</b>.</span>
                <br />
                <span>Please Check your inbox to activate your account.</span>
            </p>
        </Grid>
    );
}

export default EmailValidation