import SimpleSelect from '../Select/Select'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'
import './SortAndFilter.css'

const SORT_FIELDS = ['Age', 'Distance', 'Popularity', 'Tags']
const SORT_DIRECTION = ['Asc.', 'Desc.']
const AGE_FILTER = ['all', '18-25', '25-35', '35-45', '45-55', '55+']
const LOCATION_FILTER = ['all', '<5km', '<10km', '<25km', '<50km']
const POPULARITY_FILTER = ['all', '100', '>80', '>60', '>40', '>20']

const SortAndFilter = ({ filters, setFilter, active }) => {
    return (
        <div className={'sort-and-filter ' + (active ? 'active' : 'inactive')}>
            <div className="setting">
                <div>Sort by</div>
                <div className="double-select">
                    <SimpleSelect
                        options={SORT_FIELDS}
                        defaultSelected={filters?.sort}
                        onChange={(e) =>
                            setFilter((filter) => ({
                                ...filter,
                                sort: e.target.value,
                            }))
                        }
                    />
                    <SimpleSelect
                        options={SORT_DIRECTION}
                        defaultSelected={filters?.sortDirection}
                        onChange={(e) =>
                            setFilter((filter) => ({
                                ...filter,
                                sortDirection: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>
            <p>Filters</p>
            <div className="setting">
                <div>Age</div>
                <div>
                    <SimpleSelect
                        options={AGE_FILTER}
                        defaultSelected={filters?.age}
                        onChange={(e) =>
                            setFilter((filter) => ({
                                ...filter,
                                age: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>
            <div className="setting">
                <div>Location</div>
                <div>
                    <SimpleSelect
                        options={LOCATION_FILTER}
                        defaultSelected={filters?.location}
                        onChange={(e) =>
                            setFilter((filter) => ({
                                ...filter,
                                location: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>

            <div className="setting">
                <div>Popularity</div>
                <div>
                    <SimpleSelect
                        options={POPULARITY_FILTER.map((gender) => gender)}
                        defaultSelected={filters?.popularity}
                        onChange={(e) =>
                            setFilter((filter) => ({
                                ...filter,
                                popularity: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>

            <div className="setting complex-setting">
                <div className="setting-infos">Tags</div>
                <TagsAutocomplete
                    value={filters?.tags}
                    setValue={(e, tagsList) =>
                        setFilter((filter) => ({
                            ...filter,
                            tags: tagsList,
                        }))
                    }
                />
            </div>
        </div>
    )
}

export default SortAndFilter
