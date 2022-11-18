import React, { useState } from "react";
import { Slider } from '@mui/material';
import './index.css'

function valuetext(value) {
    return `${value}°C`;
}

const AdvancedSearch = () => {
    const [ageGap, setAgeGap] = useState([1, 16]);
    const minAge = 1;

    const [popGap, setPopGap] = useState([1, 100]);
    const minPop = 1;

    const [radius, setRadius] = useState(5);

    const handleAgeGapChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setAgeGap([Math.min(newValue[0], ageGap[1] - minAge), ageGap[1]]);
        } else {
            setAgeGap([ageGap[0], Math.max(newValue[1], ageGap[0] + minAge)]);
        }
    };

    const handlePopGapChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPopGap([Math.min(newValue[0], popGap[1] - minPop), popGap[1]]);
        } else {
            setPopGap([popGap[0], Math.max(newValue[1], popGap[0] + minPop)]);
        }
    };

    const radiusMarks = [
        {
            value: 0,
            label: '1',
        },
        {
            value: 5,
            label: '5',
        },
        {
            value: 10,
            label: '10',
        },
        {
            value: 15,
            label: '15',
        },
        {
            value: 20,
            label: '20',
        },
        {
            value: 25,
            label: '25',
        },
        {
            value: 30,
            label: '30',
        },
        {
            value: 35,
            label: '35',
        },
        {
            value: 40,
            label: '40',
        },
    ];

    return (
        <div id="advanced_search">
            <div id="advanced_search_header">
                <div id="advanced_search_title">
                    Filters
                </div>
                <button id="filters_reset_btn">Reset</button>
            </div>
            <div id="advanced_search_body">
                <div id="age_gap_search">
                    <p>Age gap</p>
                    <div className="slider_range_display">
                        {ageGap[0]} - {ageGap[1]}
                    </div>
                    <Slider
                        value={ageGap}
                        onChange={handleAgeGapChange}
                        getAriaValueText={valuetext}
                        disableSwap
                        min={1}
                        step={1}
                        max={16}
                        valueLabelDisplay="off"
                        style={{ color: "#5E0B4F" }}
                    />
                </div>
                <div id="fame_rating_search">
                    <p>Popularity</p>
                    <div className="slider_range_display">
                        {popGap[0]}% - {popGap[1]}%
                    </div>
                    <Slider
                        value={popGap}
                        onChange={handlePopGapChange}
                        getAriaValueText={valuetext}
                        disableSwap
                        min={1}
                        step={1}
                        max={100}
                        valueLabelDisplay="off"
                        style={{ color: "#5E0B4F" }}
                    /></div>
                <div id="location_search">
                    <p>Maximum search radius (km)</p>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={15}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="off"
                        marks={radiusMarks}
                        min={0}
                        step={5}
                        max={40}
                        style={{ color: "#5E0B4F" }}
                    />
                </div>
                <div id="interests_search">Interests</div>
            </div>
            <div id="advanced_search_footer">
                <button id="apply_filters_btn">Apply</button>
            </div>
        </div >
    );
}

export default AdvancedSearch;