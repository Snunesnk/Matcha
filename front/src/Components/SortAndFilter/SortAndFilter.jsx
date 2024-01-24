import './SortAndFilter.css'

const SortAndFilter = ({ setSort, setFilter, active }) => {
    return (
        <div className={'sort-and-filter ' + (active ? 'active' : 'inactive')}>
            <div className="sort">
                <label htmlFor="sort">Sort by</label>
                <select
                    name="sort"
                    id="sort"
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="age">Age</option>
                    <option value="fame">Fame</option>
                    <option value="distance">Distance</option>
                    <option value="tags">Tags</option>
                </select>
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
