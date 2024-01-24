import SimpleSelect from '../Select/Select'
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
            <div className="filter">
                <label htmlFor="filter">Filter by</label>
                <select
                    name="filter"
                    id="filter"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="tags">Tags</option>
                    <option value="age">Age</option>
                    <option value="fame">Fame</option>
                    <option value="distance">Distance</option>
                </select>
            </div>
        </div>
    )
}

export default SortAndFilter
