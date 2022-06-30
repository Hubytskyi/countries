const path = require(`path`)
const axios = require("axios")
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
    reporter.info(`Your Gatsby site has been built!`)
}

exports.createPages = async ({ actions }) => {
    const url = 'https://restcountries.com/v2/all'
    const { createPage } = actions
    const countryTemplate = path.resolve(`src/templates/country.js`)
    const result = await axios.get(url)
    result.data.forEach(country => {
        const countrySlug = country.alpha3Code.toLowerCase()
        createPage({
            path: countrySlug,
            component: countryTemplate,
            context: {
                title: country.name,
                countryRegion: country.region,
                slug: countrySlug
            },
        })
    })
}