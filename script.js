const url = `https://restcountries.eu/rest/v2/all`
fetch(url)
  .then((response) => response.json())
  .then((data) => makePageForCountries(data))
  .catch((error) => console.log(error))
 
function makePageForCountries(countriesData) {
  const countries = countriesData
  for (let i = 0; i < countries.length; i++) {
    let countryCard = document.createElement('div')
    countryCard.className = 'card card-style col-12 lg-col-3'
    let flag = document.createElement('img')
    flag.className = 'card-img-top'
    flag.src = countries[i].flag
    flag.addEventListener('click', (event) =>
      displayCurrentCountryInfo(countries[i]),
    )
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
    document.querySelector('.row').appendChild(countryCard)
  }
}
function displayCurrentCountryInfo(country) {
  document.querySelector(".row").innerHTML = '';
}
