import { Component } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Header from "../Header"
import ActionBar from "../ActionBar"
import CommentsTable from '../CommentsTable'
import Pagination from '../Pagination'

import './index.css'

const commentsApiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'INPROGRESS',
}

class Dashboard extends Component {
    state = {
        status: commentsApiStatusConstants.initial,
        comments: [],
        username: '',
        searchText: '',
        sortColumn: '',
        sortOrder: '',
        currentPage: 1,
        pageSize: 10,
    }

    componentDidMount = () => {
        this.fetchComments()
        const savedName = localStorage.getItem('user_name')
        this.setState({ username: savedName || 'User' })
    }

    fetchComments = async () => {
        this.setState({ status: commentsApiStatusConstants.inProgress })

        const response = await fetch("https://jsonplaceholder.typicode.com/comments")
        if (response.ok) {
            const data = await response.json()
            this.setState({ status: commentsApiStatusConstants.success, comments: data })
        } else {
            this.setState({ status: commentsApiStatusConstants.failure })
        }
    }

    handleSearchChange = text => {
        this.setState({ searchText: text.toLowerCase(), currentPage: 1 })
    }

    handleSort = column => {
        this.setState(prevState => {
            let newOrder = ''

            if (prevState.sortColumn !== column) {
                newOrder = 'asc'
            } else {
                if (prevState.sortOrder === '') {
                    newOrder = 'asc'
                } else if (prevState.sortOrder === 'asc') {
                    newOrder = 'desc'
                } else if (prevState.sortOrder === 'desc') {
                    newOrder = ''
                }
            }

            return {
                sortColumn: newOrder === '' ? '' : column,
                sortOrder: newOrder,
            }
        })
    }

    handlePageChange = newPage => {
        this.setState({ currentPage: newPage })
    }

    handlePageSizeChange = newSize => {
        this.setState({ pageSize: newSize, currentPage: 1 })
    }

    getFilteredSortedPaginatedComments = () => {
        const { comments, searchText, sortColumn, sortOrder, currentPage, pageSize } = this.state
        let filtered = comments

        if (searchText.trim() !== '') {
            filtered = filtered.filter(comment => {
                const nameMatch = comment.name.toLowerCase().includes(searchText)
                const emailMatch = comment.email.toLowerCase().includes(searchText)
                const commentMatch = comment.body.toLowerCase().includes(searchText)
                return nameMatch || emailMatch || commentMatch
            })
        }

        if (sortColumn && sortOrder) {
            filtered.sort((a, b) => {
                const aValue = a[sortColumn].toString().toLowerCase()
                const bValue = b[sortColumn].toString().toLowerCase()

                if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
                if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1

                return 0

            })
        }

        const startIndex = (currentPage - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginated = filtered.slice(startIndex, endIndex)

        return paginated
    }

    getFilteredCommentsLength = () => {
        const { comments, searchText } = this.state

        if (searchText.trim() === '') {
            return comments.length
        }

        return comments.filter(comment => {
            const nameMatch = comment.name.toLowerCase().includes(searchText)
            const emailMatch = comment.email.toLowerCase().includes(searchText)
            const commentMatch = comment.body.toLowerCase().includes(searchText)
            return nameMatch || emailMatch || commentMatch
        }).length
    }


    renderSuccessView = () => {
        const { username, sortColumn, sortOrder, currentPage, pageSize } = this.state
        return (
            <>
                <Header name={username} />
                <div className='dashboard-bgContainer'>
                    <div className='dashboard-subContainer'>
                        <ActionBar
                            onSearchChange={this.handleSearchChange}
                            onSort={this.handleSort}
                            sortColumn={sortColumn}
                            sortOrder={sortOrder}
                        />
                        <CommentsTable comments={this.getFilteredSortedPaginatedComments()} />
                        <Pagination
                            currentPage={currentPage}
                            pageSize={pageSize}
                            totalCount={this.getFilteredCommentsLength()}
                            onPageChange={this.handlePageChange}
                            onPageSizeChange={this.handlePageSizeChange}
                        />
                    </div>
                </div>
            </>
        )
    }

    renderCommentsLoaderView = () => (
        <div className="comments-loader-container">
            <ThreeDots height={50} width={50} color="#6663ff" />
        </div>
    )

    renderCommentsFailureView = () => (
        <div className='comments-failure-container'>
            <h1 className='comments-failure-heading'>Something went wrong</h1>
            <p className='comments-failure-description'>Please try again</p>
        </div>
    )

    render() {
        const { status } = this.state
        switch (status) {
            case commentsApiStatusConstants.success:
                return this.renderSuccessView()
            case commentsApiStatusConstants.inProgress:
                return this.renderCommentsLoaderView()
            case commentsApiStatusConstants.failure:
                return this.renderCommentsFailureView()
            default:
                return null
        }
    }
}

export default Dashboard
