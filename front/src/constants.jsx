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
    invalidPasswordLength: 'Password: at least 12 characters required',
    missingPasswordUppercase:
        'Password: at least one uppercase letter is required',
    missingPasswordLowercase:
        'Password: at least one lowercase letter is required',
    missingPasswordDigit: 'Password: at least one digit is required',
    invalidDate: 'Error: invalid date',
    userTooYoung: 'Sorry, you must be at least 18 years old to use this app',
    missingData: 'Please fill-in all fields',
    genericProfileCreationError:
        'An error occured while created your profile, please try again later',
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
    SEND_MESSAGE: 'SEND_MESSAGE',
}
