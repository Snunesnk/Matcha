import { validationErrors } from './constants'

export const checkPassword = (password) => {
    // Password => must not be empty
    if (password === '') {
        return validationErrors.fieldEmpty
    }
    // Password => must be at least 12 character long
    if (password.length < 12) {
        return validationErrors.invalidPasswordLength
    }
    // Password => must have at least 1 uppercase char
    else if (!hasLowercase(password)) {
        return validationErrors.missingPasswordLowercase
    }
    // Password => must have at least 1 lowercase char
    else if (!hasUppercase(password)) {
        return validationErrors.missingPasswordUppercase
    }
    // Password => must have at least 1 digit
    else if (!hasDigit(password)) {
        return validationErrors.missingPasswordDigit
    }

    return validationErrors.noValidationError
}

function hasUppercase(passwd) {
    return passwd.toLowerCase() !== passwd
}

function hasLowercase(passwd) {
    return passwd.toUpperCase() !== passwd
}

function hasDigit(passwd) {
    return String(passwd).match(/\d/)
}

// Function taken from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
export const hashPassword = async (password) => {
    const encoder = new TextEncoder()
    const encodedPassword = encoder.encode(password)

    const hashedPassword = await crypto.subtle.digest(
        'SHA-256',
        encodedPassword
    )

    const hashArray = Array.from(new Uint8Array(hashedPassword))
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    return hashHex
}
