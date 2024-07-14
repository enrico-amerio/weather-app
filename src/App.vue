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
      getNextHoursForecastCurrentCity(result){
        
        for (let i = 0; i < result.data.list.length; i++){
          if(result.data.list[i].dt_txt && result.data.list[i].dt_txt.startsWith(this.store.currentDate)){
            this.store.todaysWeather.push(result.data.list[i]);
          } else {
            this.store.nextDaysWeather.push(result.data.list[i]);
        }}
        // console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', this.store.todaysWeather);
        this.getNextDaysPreview();
      },
      getNextDaysPreview(){
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', this.store.nextDaysWeather);
        this.store.nextDaysPreview = Object.values(this.store.nextDaysWeather).filter(item => item.dt_txt.includes("12:00:00"));
      console.log( 'aosdnbosdnfvosnidvnosd',this.store.nextDaysPreview)
      }

    },
    mounted(){
      this.getTodayDate();
    }
  }
</script>

<template>
 <div class="container">
  <form @submit.prevent="this.getCoordinates(this.store.searchBarValue)">
    <input type="text" v-model="this.store.searchBarValue">
    <button class="btn btn-danger" type="submit">Invia</button>
  </form>
  <h2>Tempo di adesso</h2>
  <div class="card" style="width: 18rem;" v-if="Object.keys(store.currentWeather).length > 0">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">City: {{ this.store.currentWeather.name }}</li>
      <img :src="`http://openweathermap.org/img/wn/${this.store.currentWeather.weather[0].icon}@2x.png`" class="card-img-top" alt="...">
      <li class="list-group-item">Weather Description: {{ this.store.currentWeather.weather[0].description }}</li>
      <li class="list-group-item">Temperature: {{ this.store.currentWeather.main.temp }} °</li>
      <li class="list-group-item"> Humidity: {{ this.store.currentWeather.main.humidity }} %</li>
      <li class="list-group-item"> Wind Speed: {{ this.store.currentWeather.wind.speed }} km/h</li>
      <li class="list-group-item"> Air Quality: {{ this.store.currentAirQuality }}</li>
    </ul>
  </div>
  <h2>Tempo prossime ore</h2>
  <div v-if="Object.keys(store.todaysWeather).length > 0" class="d-flex flex-wrap">
    <div class="card" style="width: 18rem;"  v-for="(item, index) in this.store.todaysWeather" :key="index">
      <ul class="list-group list-group-flush">
        <img :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`" class="card-img-top" alt="...">
        <li class="list-group-item">Temperature: {{ item.main.temp }} °</li>
        <li class="list-group-item">Time: {{ item.dt_txt}} </li>
      </ul>
    </div>
    
  </div>
  <h2>Tempo prossimi giorni</h2>
  <div v-if="Object.keys(store.todaysWeather).length > 0" class="d-flex flex-wrap">
    
    <div class="card" style="width: 18rem;"  v-for="index in 4" :key="index-1">
      <ul class="list-group list-group-flush">
        <img :src="`http://openweathermap.org/img/wn/${this.store.nextDaysPreview[index-1].weather[0].icon}@2x.png`" class="card-img-top" alt="...">
        <li class="list-group-item">Temperature: {{ this.store.nextDaysPreview[index-1].main.temp }} °</li>
        <li class="list-group-item">Time: {{ this.store.nextDaysPreview[index-1].dt_txt}} </li> 
      </ul>
    </div>
  </div>
 </div>
</template>

<style scoped>

</style>
