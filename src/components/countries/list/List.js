import * as React from "react"
import {useEffect, useMemo, useState, useTransition} from "react"
import axios from "axios"
import Item from "../item/Item"
import {gridContainer, searchInput, search, searchIcon, container} from './list.module.css'
import Filter from "../../filter/Filter"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const List = () => {

    const [countries, setCountries] = useState([])
    const [error, setError] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [filteredValue, setFilteredValue] = useState('')
    const [isPending, startTransition] = useTransition()
    const [currentRegion, setCurrentRegion] = useState('')

    const handleSearchValue = (e) => {
        setSearchValue(e.target.value)
        startTransition(() => {
            setFilteredValue(e.target.value)
        })
    }

    const filteredCountries = useMemo(() => {
        return countries.filter(country => {
            const searchValue = filteredValue.toLowerCase()
            if (country.alpha3Code.toLowerCase().includes(searchValue) || country.name.toLowerCase().includes(searchValue)) {
                if (!currentRegion) {
                    return country
                } else if (country.region === currentRegion) {
                    return country
                }
            }
        })
    }, [filteredValue, countries, currentRegion])

    useEffect(() => {
        const path = 'https://restcountries.com/v2/all'
        axios.get(path)
            .then((response) => {
                setCountries(response.data)
            })
            .catch(error => {
                setError(error)
            })
    }, [])

    if (error) return `Error: ${error.message}`
    if (!countries) return "No countries!"

    return (
        <>
            <div className={container}>
                <div className={search}>
                    <FontAwesomeIcon className={searchIcon} icon={faMagnifyingGlass} size="1x"/>
                    <input
                        className={searchInput}
                        type="search"
                        placeholder="Search for a country..."
                        onChange={handleSearchValue}
                        value={searchValue}
                    />
                </div>
                <div className="filterContainer">
                    <Filter currentRegion={currentRegion} setCurrentRegion={setCurrentRegion}/>
                </div>
            </div>
            <ul className={gridContainer}>
                {isPending && 'Loading...'}
                {filteredCountries.map(country => <Item country={country} key={country.name}/>)}
            </ul>
        </>
    )
}

export default List
