import { Component } from 'react'
import Header from "../Header"
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs"
import './index.css'

const profileApiStatusConstants = {
    success: 'SUCCESS',
    initial: 'INITIAL',
    failure: 'FAILURE',
    inProgress: 'INPROGRESS',
}

function WithRouter(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate()
        return <Component {...props} navigate={navigate} />
    }
}

class Home extends Component {
    state = {
        user: null,
        profileApiStatus: profileApiStatusConstants.initial,
    }

    componentDidMount() {
        this.fetchUser()
    }

    fetchUser = async () => {
        this.setState({ profileApiStatus: profileApiStatusConstants.inProgress })
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (response.ok) {
            const data = await response.json()
            const firstUser = data[0]
            localStorage.setItem('user_name', firstUser.name)
            this.setState({ user: firstUser, profileApiStatus: profileApiStatusConstants.success })
        } else {
            this.setState({ profileApiStatus: profileApiStatusConstants.failure })
        }
    }

    getInitials = (fullName) => {
        if (!fullName) return ''
        const words = fullName.trim().split(' ')
        const initials = words
            .map(word => word[0])
            .join('')
            .toUpperCase()
        return initials
    }


    renderUserDetails = () => {
        const { user } = this.state
        const { navigate } = this.props
        const fullAddress = `${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
        const initial = this.getInitials(user.name)

        return (
            <>
                <Header name={user.name} />
                <div className="profile-bgContainer">
                    <div className="profile-container">
                        <div className="welcome-card">
                            <button className="back-button" onClick={() => navigate('/dashboard')}>
                                <BsArrowLeft size={20} />
                            </button>
                            <p className="welcome-name">Welcome, {user.name}</p>
                        </div>

                        <div className="profile-card">
                            <div className="profile-title-card">
                                <p className="profile-initial">{initial}</p>
                                <div className="profile-info-card">
                                    <p className="profile-name">{user.name}</p>
                                    <p className="profile-email">{user.email}</p>
                                </div>
                            </div>
                            <div className='profile-user-info-card'>
                                <div className='each-label-card'>
                                    <p className="label">User ID</p>
                                    <p className="value">{user.id}</p>
                                </div>
                                <div className='each-label-card'>
                                    <p className="label">Name</p>
                                    <p className="value">{user.name}</p>
                                </div>
                                <div className='each-label-card'>
                                    <p className="label">Email</p>
                                    <p className="value">{user.email}</p>
                                </div>
                                <div className='each-label-card'>
                                    <p className="label">Address</p>
                                    <p className="value">{fullAddress}</p>
                                </div>
                                <div className='each-label-card'>
                                    <p className="label">Phone</p>
                                    <p className="value">{user.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    renderLoaderView = () => (
        <div className='loader-container'>
            <ThreeDots height={50} width={50} color="#007bff" />
        </div>
    )

    renderFailureView = () => (
        <div className='failure-container'>
            <h1 className='failure-heading'>Something went wrong</h1>
            <p className='failure-description'>Please try again</p>
        </div>
    )

    render() {
        const { profileApiStatus } = this.state
        switch (profileApiStatus) {
            case profileApiStatusConstants.success:
                return this.renderUserDetails()
            case profileApiStatusConstants.inProgress:
                return this.renderLoaderView()
            case profileApiStatusConstants.failure:
                return this.renderFailureView()
            default:
                return null
        }
    }
}

export default WithRouter(Home)


