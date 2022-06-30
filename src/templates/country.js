import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, navigate} from 'gatsby'
import Layout from "../components/layout/Layout"
import {
    container,
    wrapper,
    btn,
    btnText,
    flag,
    nativeName,
    topLevelDomain,
    countryDetails,
    borderCountries,
    borderButtons,
    borderCountriesContainer,
    tag,
    countryName
} from './country.module.css'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const Country = ({pageContext}) => {

    const [country, setCountry] = useState({})
    const [borders, setBorders] = useState({})

    const getBorders = () => {
        try {
            axios.get("https://restcountries.com/v2/all")
                .then((res) => {
                    const borders = res.data.reduce((acc, curr) => {
                        acc[curr.alpha3Code] = curr.name.split('(')[0]
                        return acc
                    }, {})
                    setBorders(borders)
                })
        } catch (err) {
            console.error(err)
        }
    }

    const getCountry = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v2/name/${pageContext.title}`)
            setCountry(response.data[0])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCountry()
        getBorders()
    }, [])

    return (
        <Layout>
            <div className={container}>
                <div>
                    <button className={btn} onClick={() => navigate(-1)}>
                        <span className={btnText}><FontAwesomeIcon icon={faArrowLeft} size="1x"/>

                            <span>Back</span>
                        </span>
                    </button>
                    <div className={wrapper}>
                        {Object.keys(country).length &&
                            <img className={flag} src={country.flag} alt={'flag of ' + country.name}/>
                        }
                        {Object.keys(country).length &&
                            <div>
                                <h1 className={countryName}>{country.name}</h1>
                                <div className={countryDetails}>
                                    <div>
                                        <p className={nativeName}>Native Name: {country.nativeName}</p>
                                        <p><span
                                            className={tag}>Population: </span>{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </p>
                                        <p><span className={tag}>Region: </span>{country.region}</p>
                                        <p><span className={tag}>Sub Region: </span>{country.subregion}</p>
                                        <p><span className={tag}>Capital: </span>{country.capital}</p>
                                    </div>
                                    <div>
                                        <p className={topLevelDomain}><span
                                            className={tag}>Top Level Domain: </span>{country.topLevelDomain[0]}</p>
                                        <p><span className={tag}>Currencies: </span>{country.currencies[0].name}</p>
                                        <p><span
                                            className={tag}>Languages: </span>{country.languages.map((language, index) =>
                                            <span
                                                key={language.name.toString()}>{(index ? ', ' : '') + language.name}</span>)}
                                        </p>
                                    </div>
                                </div>
                                {country.borders &&
                                    <div className={borderCountriesContainer}><p className={borderCountries}><span
                                        className={tag}>Border Countries: </span><span
                                        className={borderButtons}>{country.borders.map(border => <Link
                                        to={`/${border.toLowerCase()}`}>
                                        <button className={btn}>{borders[border]}</button>
                                    </Link>)}</span></p></div>}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Country
