import * as React from "react"
import regions from '../../constants/regions.const'

import {selectHeader, selectBody, show, selectHeaderText, selectItem} from './filter.module.css'
import {useState} from "react"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

const Filter = ({currentRegion, setCurrentRegion}) => {

    const [toggle, setToggle] = useState(true)

    return (
        <div>
            <div className={selectHeader}>
                <div className={selectHeaderText} onClick={() => setToggle(!toggle)}>
                    <span>{currentRegion || "Filter by region"} </span>
                    <FontAwesomeIcon icon={faChevronDown} size="1x"/>
                </div>
            </div>
            <div className={toggle ? selectBody : show}>
                {regions.map(region => <div key={region} className={selectItem}
                                            onClick={() => setCurrentRegion(region)}>{region}</div>)}
            </div>
        </div>
    )
}

export default Filter

