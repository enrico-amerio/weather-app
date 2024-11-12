<script>
import { store } from '../data/store';
export default {
  data() {
    return {
      store,
      readableDate: "" // Initialize readableDate
    };
  },
  props: {
    time: String,
    temperature: Number,
    imgSrc: String
  },
  methods: {
    getReadableDate() {
      if (this.store.currentWeather.dt) {
        const timestamp = this.store.currentWeather.dt * 1000;
        const date = new Date(timestamp);

        if (!isNaN(date)) {
          const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
          this.readableDate = date.toLocaleDateString('en-GB', options);
        } else {
          this.readableDate = "Invalid Date";
        }
      } else {
        this.readableDate = "Date not available";
      }
    }
  },
  watch: {
    'store.currentWeather': {
      handler() {
        this.getReadableDate();
      },
      immediate: true
    }
  }
};
</script>


<template>
  <div class="wrap mb-5" v-if="Object.keys(store.currentWeather).length > 0">
    <h2 class="title m-0">{{ this.store.currentWeather.name }}, {{ this.store.currentWeather.sys.country }} </h2>
    <p class="mb-4">{{ this.readableDate }}</p>
    <div class="row pt-md-5 pb-md-5">
      <div class="col-12 col-md-6 d-flex justify-content-center  p-5 p-md-0">
        <img :src="`http://openweathermap.org/img/wn/${this.store.currentWeather.weather[0].icon}@2x.png`" class="weather-img" alt="...">
        <div class="d-flex flex-column justify-content-center ">
          <p class="fs-1 m-0">{{ this.store.currentWeather.main.temp }} °C</p>
          <p class=" m-0">{{ this.store.currentWeather.weather[0].description }}</p>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-around align-items-center extra-info p-5 p-md-0">
        <div>
          <p class="m-0 fs-1">{{ this.store.currentWeather.main.humidity }} <span class="fs-6">%</span></p>
          <p class="m-0">Humidity</p>
        </div>
        <div>
          <p class="m-0 fs-1">{{ this.store.currentWeather.wind.speed }}<span class="fs-6"> km/h</span> </p>
          <p class="m-0">Wind Speed</p>
        </div>
        <div>
          <p class="m-0 fs-1">{{ this.store.currentAirQuality }}</p>
          <p class="m-0">Air Quality</p>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style>
.weather-img{
  width: 50%;
}
.temp{
  font-size: 3rem;
  
}
.title{
  font-size: 4rem;

}
.extra-info{
  
    border-top: 1px solid white;
    border-bottom: 1px solid white;
  }
  @media (min-width: 768px) {
    .extra-info{
      border-left: 1px solid white; 
      border-top: 0;
      border-bottom: 0;

  }
  
  
}
</style>