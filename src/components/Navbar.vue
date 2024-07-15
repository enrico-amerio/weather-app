<script>
  import {store} from '../data/store';
  import axios from 'axios';

export default {
  data(){
      return{
        axios,
        store,
      };
    },
  methods: {
      getCoordinates(){
        this.store.currentWeather = {},
        this.store.currentAirQuality = "",
        this.store.todaysWeather = [],
        this.store.nextDaysWeather = [],
        this.store.nextDaysPreview = [],
        axios.get(this.store.getCityCoordinates + "q=" + this.store.searchBarValue + "&appid=" + this.store.APIKey)
        .then((result) => {
          this.store.selectedCity = result.data
          this.getCurrentWeather()
          this.getFiveDaysWeather()
          this.getAirQuality()
          
        })
        .catch((error) => {
          console.log(error);
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
          console.log('NEXT 5 DAYS>>>>',result);
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
      getNextHoursForecastCurrentCity(result){
        
        for (let i = 0; i < result.data.list.length; i++){
          if(result.data.list[i].dt_txt && result.data.list[i].dt_txt.startsWith(this.store.currentDate)){
            this.store.todaysWeather.push(result.data.list[i]);
          } else {
            this.store.nextDaysWeather.push(result.data.list[i]);
        }}
        this.getNextDaysPreview();
      },
      getNextDaysPreview(){
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', this.store.nextDaysWeather);
        this.store.nextDaysPreview = Object.values(this.store.nextDaysWeather).filter(item => item.dt_txt.includes("12:00:00"));
      console.log( 'aosdnbosdnfvosnidvnosd',this.store.nextDaysPreview)
      }

    },
}
</script>

<template>
  <form @submit.prevent="this.getCoordinates(this.store.searchBarValue)">
    <input type="text" v-model="this.store.searchBarValue">
    <button class="btn btn-danger" type="submit">Invia</button>
  </form>
</template>

<style>

</style>