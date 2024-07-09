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
        console.log(this.store.city);
        axios.get(this.store.getCityCoordinates + "q=" + this.store.city + "&appid=" + this.store.APIKey)
        .then((result) => {
          // console.log(result.data[0].lat);
          this.getWeather(result)
        })
        .catch((error) => {
          console.log(error);
        })
      },
      getWeather(result){
        // console.log('getWeatherLOG', result)
        axios.get(this.store.getCityWeather + "lat=" + result.data[0].lat + "&lon=" + result.data[0].lon + "&appid=" + this.store.APIKey)
        .then((result) => {
          this.store.selectedCity = result.data
          console.log(">>>>>>>>>>>>", this.store.selectedCity);
          
          
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
  <form @submit.prevent="this.getCoordinates(this.store.city)">
    <input type="text" v-model="this.store.city">
    <button class="btn btn-danger" type="submit">Invia</button>
  </form>
  
  <div class="card" style="width: 18rem;" v-if="Object.keys(store.selectedCity).length > 0">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">City: {{ this.store.selectedCity.name }}</li>
    <img :src="`http://openweathermap.org/img/wn/${this.store.selectedCity.weather[0].icon}@2x.png`" class="card-img-top" alt="...">
    <li class="list-group-item">Weather Description: {{ this.store.selectedCity.weather[0].description }}</li>
    <li class="list-group-item">Temperature: {{ this.store.selectedCity.main.temp }} °</li>
    <li class="list-group-item"> Humidity: {{ this.store.selectedCity.main.humidity }} %</li>
    <li class="list-group-item"> Wind Speed: {{ this.store.selectedCity.wind.speed }} km/h</li>
  </ul>
</div>
 </div>
</template>

<style scoped>

</style>
