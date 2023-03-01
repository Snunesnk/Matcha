export const DarkMagenta = '#5E0B4F'
export const LightRose = '#FBE3DD'
export const DarkOrange = '#BA7300'

export const PossibleState = {
    landingPage: 0,
    onboarding: 1,
    signUp: 2,
    logIn: 3,
    mainPage: 4,
}

export const validationErrors = {
    fieldEmpty: 'This field is required',
    invalidEmail: 'This is not a valid email adress',
    invalidPasswordLength: 'At least 12 characters required',
    missingPasswordUppercase: 'At least one uppercase letter is required',
    missingPasswordLowercase: 'At least one lowercase letter is required',
    missingPasswordDigit: 'At least one digit is required',
    missingData: 'Please fill-in all fields',
    genericProfileCreationError:
        'An error occured while created your profile, please try later',
    noValidationError: 'NONE',
}

export const USER_STATE_ACTIONS = {
    LOG_IN: 'USER_LOG_IN',
    LOG_OUT: 'USER_LOG_OUT',
    VERIFY: 'USER_VERIFY',
    UNVERIFY: 'USER_UNVERIFY',
    ONBOARDED: 'USER_ONBOARDED',
    UPDATE_GENDER: 'UPDATE_GENDER',
    UPADTE_PREFERENCES: 'UPDATE_PREFERENCES',
    UPDATE_BIO: 'UPDATE_BIO',
    UPDATE_TAGS: 'UPDATE_TAGS',
    UPDATE_PICTURES: 'UPDATE_PICTURES',
    UPDATE_BIRTHDATE: 'UPDATE_BIRTHDATE',
}
