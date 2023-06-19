const Header = () => {
    return (
        <header>
            <div className="container">
                <img src='./icons/logo.png' width="60px" height="60px" alt='Logo' className="logo" />
                <ul className="">
                    <li>Nicholas</li>
                    <li><img className="header-icon" src="./icons/settings_white.png" alt="User settings icon" /></li>
                    <li><img className="header-icon" src="./icons/logout.png" alt="User logout icon" /></li>
                </ul>
            </div>
        </header>
    )
}

export default Header;