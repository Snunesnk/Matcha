import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './index.css'

const progressionClasses = [
    {
        percentage: "0",
        class: "progress_zero"
    },
    {
        percentage: "20",
        class: "progress_twenty"
    },
    {
        percentage: "40",
        class: "progress_forty"
    },
    {
        percentage: "60",
        class: "progress_sixty"
    },
    {
        percentage: "80",
        class: "progress_eighty"
    },
    {
        percentage: "100",
        class: "progress_hundred"
    },
]


const ProgressBar = ({ percentage, prev, next }) => {
    const navigate = useNavigate();
    const percentageClass = progressionClasses.find(x => x.percentage === percentage).class;

    const goToNextState = () => {
        navigate("/onboarding/" + next);
    }

    const goToPreviousState = () => {
        navigate("/onboarding/" + prev);
    }

    return (
        <div id="progress_container">
            <div id="progress_bar_container">
                <span>{percentage}% completed</span>
                <div id="progress_bar" className={percentageClass}></div>
            </div>
            <div id="next_and_prev_button">
                <a id="progress_next" className={next === "" ? "disabled" : ""} onClick={goToNextState}><KeyboardArrowDownIcon></KeyboardArrowDownIcon></a>
                <a id="progress_prev" className={prev === "" ? "disabled" : ""} onClick={goToPreviousState}><KeyboardArrowUpIcon></KeyboardArrowUpIcon></a>
            </div>
        </div>
    )
}

export default ProgressBar;