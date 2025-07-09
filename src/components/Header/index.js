// src/components/Header/index.js
import './index.css'

const Header = ({ name }) => {
    const getInitials = fullName => {
        if (!fullName) return ''
        return fullName
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
    }

    const initials = getInitials(name)

    return (
        <div className='header-bgContainer'>
            <div className="header-container">
                <h1 className="header-logo">
                    <img
                        src="https://cdn.shopify.com/app-store/listing_images/cafad00e018538eb2fdb64a679e7bd63/icon/CLHkxMDFovcCEAE=.png"
                        alt="logo"
                        className='header-logo-img'
                    />
                    WIFT</h1>
                <div className='header-avatar-card'>
                    <p className="header-avatar">{initials}</p>
                    <p className='header-name'>{name}</p></div>
            </div>
        </div>
    )
}

export default Header
