import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const OnboardingCard = ({
    header,
    content,
    next,
    btnText,
    onClick = () => {},
}) => {
    return (
        <div className="onboarding_card">
            <div className="header">{header}</div>
            <div className="content">{content}</div>
            <div className="footer">
                <div className="card_next">
                    <Link to={next}>
                        <button id="onboarding_next_button" onClick={onClick}>
                            {btnText}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OnboardingCard
