import * as React from "react"
import {gridItem, flag, description, countryName, property, countryDetails, imgContainer, link} from './item.module.css'
import {Link} from "gatsby"

const Item = ({country}) => {
    const populationWithCommas = country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return (
        <li className={gridItem}>
            <Link className={link} to={`/${country.alpha3Code.toLowerCase()}`}>
                <div className={imgContainer}>
                    <img src={country.flag} alt={'flag of ' + country.name} className={flag}/>
                </div>
                <div className={description}>
                    <h1 className={countryName}>{country.name}</h1>
                    <p className={property}>Population: <span className={countryDetails}>{populationWithCommas}</span>
                    </p>
                    <p className={property}>Region: <span className={countryDetails}>{country.region}</span></p>
                    <p className={property}>Capital: <span className={countryDetails}>{country.capital}</span></p>
                </div>
            </Link>
        </li>
    )
}

export default Item
