import './index.css'

const Pagination = props => {
    const {
        currentPage,
        pageSize,
        totalCount,
        onPageChange,
        onPageSizeChange,
    } = props

    const totalPages = Math.ceil(totalCount / pageSize)
    console.log(totalPages, pageSize)
    const startIndex = (currentPage - 1) * pageSize + 1
    const endIndex = Math.min(startIndex + pageSize - 1, totalCount)

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    const renderPages = () => {
        const pages = []

        if (currentPage > 1) {
            pages.push(
                <button
                    key={currentPage - 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="prev-next-button"
                >
                    {currentPage - 1}
                </button>
            )
        }

        pages.push(
            <button key={currentPage} className="active-page">
                {currentPage}
            </button>
        )

        if (currentPage < totalPages) {
            pages.push(
                <button
                    key={currentPage + 1}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="prev-next-button"
                >
                    {currentPage + 1}
                </button>
            )
        }

        return pages
    }

    return (
        <div className="pagination-container">
            <p className="item-range">
                {startIndex}-{endIndex} of {totalCount} items
            </p>

            <div className="pagination-controls">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className='previous-next-btn'
                >
                    &lt;
                </button>

                {renderPages()}

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className='previous-next-btn'
                >
                    &gt;
                </button>
            </div>

            <select
                className="page-size-dropdown"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
                <option value={10}>10 / Page</option>
                <option value={50}>50 / Page</option>
                <option value={100}>100 / Page</option>
            </select>
        </div>
    )
}

export default Pagination
