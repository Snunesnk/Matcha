import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const OnboardingCard = ({
    header,
    content,
    next,
    btnText,
    btnClass = 'white',
    submit = false,
    onClick = () => {},
}) => {
    return (
        <div className="onboarding_card">
            <div className="header">{header}</div>
            <div className="content">{content}</div>
            <div className="footer">
                {next !== '' && (
                    <Link to={next}>
                        <button
                            className={'btn ' + btnClass}
                            onClick={onClick}
                            type={submit ? 'submit' : 'button'}
                        >
                            {btnText}
                        </button>
                    </Link>
                )}
                {next == '' && (
                    <button
                        className={'btn ' + btnClass}
                        onClick={onClick}
                        type={submit ? 'submit' : 'button'}
                    >
                        {btnText}
                    </button>
                )}
            </div>
        </div>
    )
}

export default OnboardingCard
