import SimpleSelect from '../Select/Select'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'
import './SortAndFilter.css'

const GENDERS = ['f', 'm', 'nb']

const SortAndFilter = ({ setSort, setFilter, active }) => {
    return (
        <div className={'sort-and-filter ' + (active ? 'active' : 'inactive')}>
            <div className="setting">
                <div>Sort by</div>
                <div>
                    <SimpleSelect
                        options={GENDERS.map((gender) => gender)}
                        // defaultSelected={userPreferences}
                        // onChange={handlePreferenceChange}
                    />
                    <SimpleSelect
                        options={GENDERS.map((gender) => gender)}
                        // defaultSelected={userPreferences}
                        // onChange={handlePreferenceChange}
                    />
                </div>
            </div>
            <div className="setting">
                <div>Filter age</div>
                <div>
                    <SimpleSelect
                        options={GENDERS.map((gender) => gender)}
                        // defaultSelected={userPreferences}
                        // onChange={handlePreferenceChange}
                    />
                </div>
            </div>
            <div className="setting">
                <div>Filter location</div>
                <div>
                    <SimpleSelect
                        options={GENDERS.map((gender) => gender)}
                        // defaultSelected={userPreferences}
                        // onChange={handlePreferenceChange}
                    />
                </div>
            </div>

            <div className="setting">
                <div>Filter popularity</div>
                <div>
                    <SimpleSelect
                        options={GENDERS.map((gender) => gender)}
                        // defaultSelected={userPreferences}
                        // onChange={handlePreferenceChange}
                    />
                </div>
            </div>

            <div className="setting complex-setting">
                <div className="setting-infos">Filter tags</div>
                <TagsAutocomplete
                // value={searchTags}
                // setValue={(e, tagsList) => setSearchTags(tagsList)}
                />
            </div>
        </div>
    )
}

export default SortAndFilter
