const search = document.querySelector('#searchInput')

const rootElm = document.querySelector('#root')
const url = `https://restcountries.eu/rest/v2/all`
fetch(url)
  .then((response) => response.json())
  .then((data) => makePageForCountries(data))
  .catch((error) => console.log(error))
let countries
function makePageForCountries(countriesData) {
  countries = countriesData
  for (let i = 0; i < countries.length; i++) {
    let divResponsive = document.createElement('div')
    divResponsive.className +=
      'col-sm-12 col-md-4 col-lg-3 mb-sm-2 mb-md-2 mt-md-3 mb-lg-3 mt-lg-3 p-2 page'
    let countryCard = document.createElement('div')
    countryCard.className = 'card'
    let flag = document.createElement('img')
    flag.className = 'card-img-top'
    flag.src = countries[i].flag
    flag.addEventListener('click', () => {
      displayInfo(countries[i])
    })
    let countriesInfo = document.createElement('div')
    countriesInfo.className = 'card-body'
    let countryName = document.createElement('h5')
    countryName.className = 'card-title'
    countryName.innerHTML = countries[i].name
    let population = document.createElement('p')
    population.className = 'card-text'
    population.innerHTML = 'Population: ' + countries[i].population
    let region = document.createElement('p')
    region.className = 'card-text'
    region.innerHTML = 'Region: ' + countries[i].region
    let capital = document.createElement('p')
    capital.className = 'card-text'
    capital.innerHTML = 'Capital: ' + countries[i].capital
    countryCard.appendChild(flag)
    countriesInfo.appendChild(countryName)
    countriesInfo.appendChild(population)
    countriesInfo.appendChild(region)
    countriesInfo.appendChild(capital)
    countryCard.appendChild(countriesInfo)
    divResponsive.appendChild(countryCard)
    rootElm.appendChild(divResponsive)
  }
}
function displayInfo(country) {
  console.log(country)
  document.querySelector('#show').style.display = 'none'
  const countryInfo = document.querySelector('#info')
  const infoBody = countryInfo.querySelector('#info-body')
  const countryImage = countryInfo.querySelector('img')
  countryImage.className = 'countryImg'
  countryImage.src = country.flag
  infoBody.innerHTML = `
        <h2 class="mt-sm-3">
        ${country.name}
        </h2>
        <div class="mt-sm-5 d-flex m-auto justify-content-center">
        <div>
        <p>
            <strong>Native Name:</strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        <div class = "d-flex m-auto">
        <p class="d-flex"> <strong>Border Countries:</strong> <p>
         ${findBorder(country.borders)}
        </div>
        </div>
        <div>
        <p>
            <strong>Top Level Domain:</strong>
            ${country.topLevelDomain[0]}
        </p>
        <p>
            <strong>Currencies:</strong>
            ${country.currencies.map((currency) => currency.code)}
        </p>
        <p>
            <strong>Languages:</strong>
            ${country.languages.map((language) => language.name)}
        </p>
        </div>
        </div>
    `
}

function findBorder(border) {
  let borderCountry = ''
  border.forEach((bor) => {
    borderCountry += findCountryName(bor)
  })
}

function findCountryName(alphaCode) {
  console.log(countries)
  console.log(countries.find((country) => country.alpha3code == alphaCode))
}
// search Input
search.addEventListener('input', findCountry)

function findCountry() {
  const inputValue = search.value.toLowerCase()
  const pages = document.querySelectorAll('.page')
  pages.forEach((ele) => {
    if (ele.innerText.toLowerCase().indexOf(inputValue) >=0) {
      ele.style.display = 'flex'
    } else {
      ele.style.display = 'none'
    }
  })
}

// filter by continent
const menu = document.querySelector('.dropdown-menu')
const continents =document.querySelectorAll('.dropdown-item')
continents.forEach((menu) => {
  menu.addEventListener('click', () => {
    const value = menu.innerText
    const countryRegion = document.querySelectorAll('.page')
    countryRegion.forEach((region) => {
      if (region.innerText.includes(value)) {
        region.style.display = 'flex'
      } else {
        region.style.display = 'none'
      }
    })
  })
})
