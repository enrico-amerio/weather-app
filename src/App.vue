<script>
  import axios from 'axios';
  import {store} from './data/store';
  export default{
    data(){
      return{
        axios,
        store,
      };
    },
    methods: {
      getCoordinates(){
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

        })
        .catch((error) => {
          console.log(error);
        })
      },
      getAirQuality(){
        axios.get(this.store.getCityWeather + "/air_pollution?" + "lat=" + this.store.selectedCity[0].lat + "&lon=" + this.store.selectedCity[0].lon + "&appid=" + this.store.APIKey)
        .then((result) => {
          console.log('AIR POLLUTION>>>>>>>>>>',result);

        })
        .catch((error) => {
          console.log(error);
        })
       
      }
    }
  }
</script>

<template>
 <div class="container">
  <form @submit.prevent="this.getCoordinates(this.store.searchBarValue)">
    <input type="text" v-model="this.store.searchBarValue">
    <button class="btn btn-danger" type="submit">Invia</button>
  </form>
  
  <div class="card" style="width: 18rem;" v-if="Object.keys(store.currentWeather).length > 0">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">City: {{ this.store.currentWeather.name }}</li>
    <img :src="`http://openweathermap.org/img/wn/${this.store.currentWeather.weather[0].icon}@2x.png`" class="card-img-top" alt="...">
    <li class="list-group-item">Weather Description: {{ this.store.currentWeather.weather[0].description }}</li>
    <li class="list-group-item">Temperature: {{ this.store.currentWeather.main.temp }} °</li>
    <li class="list-group-item"> Humidity: {{ this.store.currentWeather.main.humidity }} %</li>
    <li class="list-group-item"> Wind Speed: {{ this.store.currentWeather.wind.speed }} km/h</li>
  </ul>
</div>
 </div>
</template>

<style scoped>

</style>
