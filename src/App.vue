<script>
  import axios from 'axios';
  import {store} from './data/store';
  import Navbar from './components/Navbar.vue';
  import Main from './components/Main.vue';
  import Loader from './components/Loader.vue';

  export default{
    data(){
      return{
        axios,
        store,
      };
    },
    components:{
      Navbar,
      Main,
      Loader
    },
    methods: {
      getUserLocation(){
        this.store.currentWeather = {},
        this.store.currentAirQuality = "",
        this.store.todaysWeather = [],
        this.store.nextDaysWeather = [],
        this.store.nextDaysPreview = [],
        this.store.errorText = '',
        this.store.selectedCity = [],
        this.store.selectedCountry = ''
        if(navigator.geolocation){
          this.store.getLocationPermitted = true,
          navigator.geolocation.getCurrentPosition(
            (position) => {
            this.store.selectedCity = [
              {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              }]
            this.getCurrentWeather()
            this.getFiveDaysWeather()
            this.getAirQuality()
          },
          (error) => {
            this.store.getLocationPermitted = false,
            this.store.selectedCity = [
              {
                lat: 41.8947,
                lon: 12.4839,
              }]
              this.getCurrentWeather()
              this.getFiveDaysWeather()
              this.getAirQuality()
              this.errorMessage = "Geolocation denied or unavailable.";
              console.error(error);
          }
        );
          
          }else{
          console.log('Non ha funzionato')
          this.getCoordinates()
        }
      },
      getCoordinates(){
        this.store.currentWeather = {},
        this.store.currentAirQuality = "",
        this.store.todaysWeather = [],
        this.store.nextDaysWeather = [],
        this.store.nextDaysPreview = [],
        this.store.errorText = '',
        this.store.searchBarValue = "",
        this.store.selectedCity = [],
        this.store.selectedCountry = '',
        axios.get(this.store.getCityCoordinates + "q=" + this.store.serchedCity + ',' + this.store.selectedCountry + "&appid=" + this.store.APIKey)
        .then((result) => {
          this.store.selectedCity = result.data
          this.getCurrentWeather()
          this.getFiveDaysWeather()
          this.getAirQuality()

        })
        .catch((error) => {
          console.log(error);
          this.store.errorText = 'Inserisci un valore valido e riprova'
        })
      },
      getCurrentWeather(){
        axios.get(this.store.getCityWeather + "/weather?units=metric&" + "lat=" + this.store.selectedCity[0].lat + "&lon=" + this.store.selectedCity[0].lon + "&appid=" + this.store.APIKey)
        .then((result) => {
          this.store.currentWeather = result.data

        })
        .catch((error) => {
          console.log(error);
        })
      },
      getFiveDaysWeather(){
        axios.get(this.store.getCityWeather + "/forecast?units=metric&" + "lat=" + this.store.selectedCity[0].lat + "&lon=" + this.store.selectedCity[0].lon + "&appid=" + this.store.APIKey)
        .then((result) => {
          this.store.nextHours = result.data.list;
          this.getNextHoursForecastCurrentCity(result)
          
        })
        .catch((error) => {
          console.log(error);
        })
      },
      getAirQuality(){
        axios.get(this.store.getCityWeather + "/air_pollution?" + "lat=" + this.store.selectedCity[0].lat + "&lon=" + this.store.selectedCity[0].lon + "&appid=" + this.store.APIKey)
        .then((result) => {
          this.getWord(result.data.list[0].main.aqi);
        })
        .catch((error) => {
          console.log(error);
        })
      },
      getWord(apiValue) {
        const wordMap = {
          1: 'Good',
          2: 'Fair',
          3: 'Moderate',
          4: 'Poor',
          5: 'Very Poor'
        };

        this.store.currentAirQuality = wordMap[apiValue];
      },
      getTodayDate(){
        const date = new Date();
        let currentYear = date.getFullYear();
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
        this.store.currentDate = currentDate;
      },
      
      async getNextHoursForecastCurrentCity(result) {
        // Svuota e verifica se svuota correttamente prima dell'assegnazione
        this.store.todaysWeather = [];
        this.store.nextDaysWeather = [];

        for (let i = 0; i < result.data.list.length; i++) {
          const forecast = result.data.list[i];
          if (forecast.dt_txt && forecast.dt_txt.startsWith(this.store.currentDate)) {
            this.store.todaysWeather.push(forecast);
          } else {
            this.store.nextDaysWeather.push(forecast);
          }
        }
        
        // Richiama la funzione per generare l'anteprima dei giorni successivi
        this.getNextDaysPreview();
      },


      getNextDaysPreview(){
        this.store.nextDaysPreview = Object.values(this.store.nextDaysWeather).filter(item => item.dt_txt.includes("12:00:00"));
      }

    },
    mounted(){
      this.getTodayDate();
      this.getUserLocation();
      
    }
  }
</script>

<template>
  <body @click="this.store.suggestionsOpen = false">
    <Navbar @submit-search="getCoordinates" @getUserLocation="getUserLocation" /> 
    <Loader v-if="Object.keys(store.currentWeather).length === 0 && this.store.errorText.length === 0"/>
    <Main/>
  </body>
</template>

<style lang="scss" scoped>
@use './assets/scss/main.scss';
</style>
