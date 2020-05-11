const search = document.querySelector('#searchInput');
const rootElm = document.querySelector('#root');
const backButton = document.querySelector('#backButton');
const url = `https://restcountries.eu/rest/v2/all`;
const modeSwitch = document.querySelector('#mode');
const modeName = document.querySelector('#mode-name');
const alphaCodes = [];
window.onload = setup;

function setup() {
    getCountriesData();
}

function getCountriesData() {
    fetch(url)
        .then(response => response.json())
        .then(data => makePageForCountries(data))
        .catch(error => console.log(error));
}

function makePageForCountries(countriesData) {
    const countries = countriesData;
    for (let i = 0; i < countries.length; i++) {
        let divResponsive = document.createElement('div');
        divResponsive.className +=
            'col-sm-12 col-md-4 col-lg-3 mb-sm-2 mb-md-2 mt-md-3 mb-lg-3 mt-lg-3 p-2 page';
        let countryCard = document.createElement('div');
        countryCard.className = 'card';
        countryCard.addEventListener('click', () => {
            displayInfo(countries[i]);
        });
        getAlphaCodes(countries[i]);
        let flag = document.createElement('img');
        flag.className = 'card-img-top border border-secondary';
        flag.src = countries[i].flag;
        let countriesInfo = document.createElement('div');
        countriesInfo.className = 'card-body';
        let countryName = document.createElement('h5');
        countryName.className = 'card-title';
        countryName.innerHTML = countries[i].name;
        let population = document.createElement('p');
        population.className = 'card-text';
        population.innerHTML =
            'Population: ' + formatNumber(countries[i].population);
        let region = document.createElement('p');
        region.className = 'card-text';
        region.innerHTML = 'Region: ' + countries[i].region;
        let capital = document.createElement('p');
        capital.className = 'card-text';
        capital.innerHTML = 'Capital: ' + countries[i].capital;
        backButton.style.display = 'none';
        countryCard.appendChild(flag);
        countriesInfo.appendChild(countryName);
        countriesInfo.appendChild(population);
        countriesInfo.appendChild(region);
        countriesInfo.appendChild(capital);
        countryCard.appendChild(countriesInfo);
        divResponsive.appendChild(countryCard);
        rootElm.appendChild(divResponsive);
    }
}
const formatNumber = num =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

function getAlphaCodes(country) {
    alphaCodes.push({ name: country.name, code: country.alpha3Code });
}

function displayInfo(country) {
    document.querySelector('#show').style.display = 'none';
    document.querySelector('#find-countries').style.display = 'none';
    backButton.style.display = 'block';
    document.querySelector('#info ').style.display = 'block ';
    const countryInfo = document.querySelector('#info');
    const infoBody = countryInfo.querySelector('#info-body');
    const countryImage = countryInfo.querySelector('img');
    countryImage.className = 'countryImg';
    countryImage.src = country.flag;
    infoBody.innerHTML = `
        <h2 class="mt-sm-3">
        ${country.name}
        </h2>
        <div class="mt-sm-5 d-flex">
        <div class="mr-1" id="country-details">
        <p>
            <strong>Native Name: </strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population: </strong>
            ${formatNumber (country.population)}
        </p>
        <p>
            <strong>Region: </strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region: </strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital: </strong>
            ${country.capital}
        </p>
        </div>
        <div class = " d-flex flex-column" >
        <p class = "d-flex">
            <strong id="details-right">Top Level Domain: </strong>
             ${country.topLevelDomain[0]}
        </p>
        <p class = " d-flex">
            <strong id="details-right">Currencies: </strong>
             ${country.currencies.map (currency => currency.code)}
        </p>
        <p class = " d-flex">
            <strong id="details-right">Languages: </strong>
             ${country.languages.map (language => language.name)}
        </p>
        </div>
        </div>
        <div class = "mb-sm-1 d-flex mr-sm-5">
        <p class="d-flex mt-sm-2 mr-sm-2"> <strong>Border Countries: </strong> </p>
        <p class="d-inline-flex borders"> ${getBorderName (country.borders)} </p>
        </div>
    `;
}
//get border countries
function getCountryName(countryCode) {
    let name = '';
    alphaCodes.forEach(country => {
        if (country.code.toLowerCase() === countryCode.toLowerCase()) {
            name = country.name;
            return name;
        } else return;
    });
    return name;
}

function getBorderName(borderCodes) {
    let name = '';
    nameArr = [];
    borderCodes.forEach(code => {
        name = getCountryName(code);
        nameArr.push(
            `<button type="button" class="d-flex justify-content-start mr-md-2 btn btn-outline-secondary border-buttons">${name}</button>`
        );
    });
    if (nameArr.length === 0) {
        return 'No Border';
    }
    return nameArr.join('');
}
// search Input
search.addEventListener('input', findCountry);

function findCountry() {
    const inputValue = search.value.toLowerCase();
    const pages = document.querySelectorAll('.page');
    pages.forEach(ele => {
        if (ele.innerText.toLowerCase().indexOf(inputValue) > -1) {
            ele.style.display = 'block';
        } else {
            ele.style.display = 'none';
        }
    });
}
// filter by continent
const menu = document.querySelector('.dropdown-menu');
const continents = document.querySelectorAll('.dropdown-item');
continents.forEach(menu => {
    menu.addEventListener('click', () => {
        const value = menu.innerText;
        const countryRegion = document.querySelectorAll('.page');
        countryRegion.forEach(region => {
            if (region.innerText.includes(value)) {
                region.style.display = 'block';
            } else if (value == 'All') {
                region.style.display = 'block';
            } else {
                region.style.display = 'none';
            }
        });
    });
});
// back button
backButton.addEventListener('click', () => {
    backButton.style.display = 'none';
    document.querySelector('#info').style.display = 'none';
    document.querySelector('#find-countries').style.display = 'block';
    document.querySelector('#show').style.display = 'block';
    getCountriesData();
});
//mode Switch
modeSwitch.addEventListener('click', toggleMode);

function toggleMode() {
    changeMode(modeName.textContent === 'Dark Mode');
}

function changeMode(condition) {
    if (condition) {
        document.documentElement.className = 'mode-dark';
        modeName.textContent = 'Light Mode';
    } else {
        document.documentElement.className = 'mode-light';
        modeName.textContent = 'Dark Mode';
    }
}