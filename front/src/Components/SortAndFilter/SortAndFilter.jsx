import SimpleSelect from '../Select/Select'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'
import './SortAndFilter.css'

const SORT_FIELDS = ['Age', 'Distance', 'Popularity', 'Tags']
const SORT_DIRECTION = ['Asc.', 'Desc.']
const AGE_FILTER = ['all', '18-25', '25-35', '35-45', '45-55', '55+']
const LOCATION_FILTER = ['all', '<5km', '<10km', '<25km', '<50km', '50+km']
const POPULARITY_FILTER = ['all', '100', '>80', '>60', '>40', '>20']

const SortAndFilter = ({ setSort, setFilter, active }) => {
    return (
        <div className={'sort-and-filter ' + (active ? 'active' : 'inactive')}>
            <div className="setting">
                <div>Sort by</div>
                <div className="double-select">
                    <SimpleSelect
                        options={SORT_FIELDS.map((gender) => gender)}
                        // defaultSelected={userPreferences}
                        // onChange={handlePreferenceChange}
                    />
                    <SimpleSelect
                        options={SORT_DIRECTION.map((gender) => gender)}
                        // defaultSelected={userPreferences}
                        // onChange={handlePreferenceChange}
                    />
                </div>
            </div>
            <p>Filters</p>
            <div className="setting">
                <div>Age</div>
                <div>
                    <SimpleSelect
                        options={AGE_FILTER.map((gender) => gender)}
                        // defaultSelected={userPreferences}
                        // onChange={handlePreferenceChange}
                    />
                </div>
            </div>
            <div className="setting">
                <div>Location</div>
                <div>
                    <SimpleSelect
                        options={LOCATION_FILTER.map((gender) => gender)}
                        // defaultSelected={userPreferences}
                        // onChange={handlePreferenceChange}
                    />
                </div>
            </div>

            <div className="setting">
                <div>Popularity</div>
                <div>
                    <SimpleSelect
                        options={POPULARITY_FILTER.map((gender) => gender)}
                        // defaultSelected={userPreferences}
                        // onChange={handlePreferenceChange}
                    />
                </div>
            </div>

            <div className="setting complex-setting">
                <div className="setting-infos">Tags</div>
                <TagsAutocomplete
                // value={searchTags}
                // setValue={(e, tagsList) => setSearchTags(tagsList)}
                />
            </div>
        </div>
    )
}

export default SortAndFilter
