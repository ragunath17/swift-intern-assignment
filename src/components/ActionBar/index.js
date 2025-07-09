import { BsSearch } from "react-icons/bs";
import './index.css'

const getSortArrow = (column, selectedColumn, order) => {
    if (column !== selectedColumn) return ' ⌄' // default dropdown arrow style
    if (order === 'asc') return ' ⌃'
    if (order === 'desc') return ' ⌄'
    return ' ⌄'
}

const ActionBar = props => {
    const { onSearchChange, onSort, sortColumn, sortOrder } = props

    return (
        <div className="action-bar">
            <div className="sort-buttons">
                <button onClick={() => onSort('postId')} className="sort-btn">
                    Sort Post ID {getSortArrow('postId', sortColumn, sortOrder)}
                </button>
                <button onClick={() => onSort('name')} className="sort-btn">
                    Sort Name {getSortArrow('name', sortColumn, sortOrder)}
                </button>
                <button onClick={() => onSort('email')} className="sort-btn">
                    Sort Email {getSortArrow('email', sortColumn, sortOrder)}
                </button>
            </div>
            <div className='search-container'>
                <BsSearch className="search-icon" />
                <input
                    type="search"
                    className="search-input"
                    placeholder="Search name, email, comment"
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    )
}

export default ActionBar
