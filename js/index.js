window.addEventListener("load", () => {
  //variables
  const countriesContainer = document.getElementById("countries-container");
  const urlBase = "https://restcountries.com/v3.1";
  let arrayData = [];
  const optionsRegion= document.querySelector('.filter__dropdown');
  const filterText = document.querySelector('.filter__select .select__text');
  optionsRegion.addEventListener('click',(e)=>{
    const option = e.target.innerHTML;
    filterText.innerText = option;
    getCountriesByCondition('region',option);
  });
  


  //funciones


  const printCountries = (arrCountries) => {
    arrCountries.forEach((country) => {
      const newCard = document.createElement("article"); //<article></article>
      newCard.classList.add("card-country"); //<article class="card-country"></article>
      newCard.innerHTML = `
        <div class="card-country__img">
          <img src="${country.flags.png}" alt="">
        </div>
        <div class="card-country__info">
          <h3 class="info__title">${country.name.common}</h3>
          <p class="info__item">
            <strong>Population:</strong> ${country.population}
          </p>
          <p class="info__item"> 
            <strong>Region:</strong> ${country.region}
          </p>
          <p class="info__item">
            <strong>Capital:</strong> ${country.capital ? country.capital[0] : 'no capital'}
          </p>
        </div>
        `;

        countriesContainer.appendChild(newCard);
    });
  };

  const removeCountries = () => {
    while (countriesContainer.lastChild) {
      countriesContainer.removeChild(countriesContainer.lastChild)
    }
  }

  const getCountriesByCondition = (key, value) => {
    const result = arrayData.filter( country => country[key] == value );
    console.log(result);
    removeCountries();
    printCountries(result);
  }

  const getCountriesFromAPI = async () => {
    try {
      const response = await fetch(`${urlBase}/all`);
      const data = await response.json();
      arrayData = data;
      console.log(data);
      printCountries(arrayData);
    } catch (error) {
      console.error(error);
    }
  };

  const captura = () => {
    const valorInput = document.getElementById("search");
    valorInput.addEventListener('keyup', e =>{
      e.preventDefault();
      const letra = valorInput.value;
      console.log(letra)
      const paisFriltrado = arrayData.filter(country => country.name.common === letra);
      console.log(paisFriltrado);
      removeCountries();
      printCountries(paisFriltrado);
    })
  }
  
  

  //eventos

  //ejecuciones inmediatas
  getCountriesFromAPI();
  captura();

});
