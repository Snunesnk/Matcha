import React from "react";
import './index.css'

const AdvancedSearch = () => {
    return (
        <div id="advanced_search">
            <div id="advanced_search_header">
                <div id="advanced_search_title">
                    Filters
                </div>
                <button id="filters_reset_btn">Reset</button>
            </div>
            <div id="advanced_search_body">
                <div id="age_gap_search"> Age gap</div>
                <div id="fame_rating_search">Fame rating gap</div>
                <div id="location_search">Location</div>
                <div id="interests_search">Interests</div>
            </div>
            <div id="advanced_search_footer">
                <button id="apply_filters_btn">Apply</button>
            </div>
        </div>
    );
}

export default AdvancedSearch;