const Header = ({currentUser, logout}) => {
    return (
        <header>
            <div className="container">
                <img src='./icons/logo.png' width="30px" height="30px" alt='Logo' className="logo" />
                {
                currentUser && 
                <ul className="header-user">
                    <li>{currentUser.fullName}</li>
                    <li><img className="header-icon" src="./icons/settings_white.png" alt="User settings icon" /></li>
                    <li onClick={logout}><img className="header-icon" src="./icons/logout.png" alt="User logout icon" /></li>
                </ul>
                }
            </div>
        </header>
    )
}

export default Header;