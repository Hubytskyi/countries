import * as React from "react"
import {header, darkModeIcon, logo, mode} from './header.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoon} from '@fortawesome/free-regular-svg-icons'
import {faMoon as faMoonSolid} from '@fortawesome/free-solid-svg-icons'


const Header = ({theme, switchTheme}) => {

    return (
        <header className={header}>
            <div className={logo}>
                <span>Where in the world?</span>
            </div>
            <div className={mode} onClick={switchTheme}>
                {theme === 'light'
                    ? <><FontAwesomeIcon className={darkModeIcon} icon={faMoon} size="1x"/> <span>Dark Mode</span></>
                    : <><FontAwesomeIcon className={darkModeIcon} icon={faMoonSolid} size="1x"/>
                        <span>Dark Mode</span></>
                }
            </div>
        </header>
    )
}

export default Header
