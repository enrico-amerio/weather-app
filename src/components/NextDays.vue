<script>
  import { store } from '../data/store';
  export default {
    data() {
      return {
        store
      }
    },
    methods: {
      getDayOfWeek(dateString) {
        const date = new Date(dateString.replace(' ', 'T')); // Ensures compatibility with ISO format
        if (!isNaN(date)) {
          return date.toLocaleDateString('en-GB', { weekday: 'short' });
        } else {
          return "Invalid Date";
        }
      },
      formatDate(dateString) {
        const date = new Date(dateString.replace(' ', 'T'));
        if (!isNaN(date)) {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
          return `${day}/${month}`;
        } else {
          return "Invalid Date";
        }
      }
    }
  }
</script>

<template>
  <div v-if="Object.keys(store.todaysWeather).length > 0" class="pb-5">
    <h2 class="mb-3">Next Days</h2>
    <div v-for="(forecast, index) in store.nextDaysPreview.slice(0, 4)" :key="index" class="d-flex justify-content-around align-items-center w-100 customBar mb-4 p-2">
      <div>
        <p class="text-center m-0 fs-4">{{ getDayOfWeek(forecast.dt_txt) }}</p>
        <p class="m-0">{{ formatDate(forecast.dt_txt) }}</p>
      </div>
      <div>
        <img :src="`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`" class="card-img-top" alt="Weather Icon">
      </div>
      <div>
        <p class="m-0 text-center fs-4">{{ forecast.main.temp }} <span class="fs-6">°C</span> </p>
        <p class="m-0 d-none d-md-block">Temperature</p>
      </div>
      <div class="d-none d-md-block">
        <p class="m-0 text-center fs-4">{{ forecast.main.humidity }} <span class="fs-6">%</span></p>
        <p class="m-0">Humidity</p>
      </div>
      <div class="d-none d-md-block">
        <p class="m-0 text-center fs-4">{{ forecast.wind.speed }} <span class="fs-6">km/h</span></p>
        <p class="m-0">Wind Speed</p>
      </div>
    </div>
  </div>
</template>

<style>
.customBar {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
}
</style>
