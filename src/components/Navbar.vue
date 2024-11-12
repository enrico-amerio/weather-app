<script>
import axios from 'axios';
import { store } from '../data/store';
export default {
  data(){
    return{
      store

    }
    
  },
  props: ['searchValue'],
  methods: {
    onSubmit() {
      this.$emit('submit-search');
    },
    fetchCities(){
      this.store.suggestions = {},
      this.store.selectedCountry = '',
      this.store.suggestionsOpen = true
      this.store.serchedCity = this.store.searchBarValue
      axios.get(this.store.getCityCoordinates + "q=" + this.store.serchedCity + "&limit=5" + "&appid=" + this.store.APIKey)
        .then((result) => {
          this.store.suggestions = result.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateSelectCity(city,country){
      this.store.serchedCity = city
      this.store.selectedCountry = country
      this.store.suggestionsOpen = false

      this.$emit('submit-search');
      console.log('>>>>>>>>>>>>>>',this.store.selectedCity)
    },
    getUserLocation(){
      this.$emit('getUserLocation')
    }
  }
}
</script>

<template>
  <div class="container mb-5">
    <div class="wrap d-flex justify-content-end align-items-end">
      <button class="me-4 location-btn" :class="this.store.getLocationPermitted ? 'location-permitted' : 'location-denied'" @click="getUserLocation" :title="this.store.getLocationPermitted ? '' : 'Geolocation is disabled. Change your settings to enable it.'">
        <i class="fa-solid fa-location-arrow"></i>
      </button>
      <form @submit.prevent="onSubmit" class="search-form">
        <div class="search-bar-container pt-5">
          <input 
            type="text" 
            v-model="store.searchBarValue" 
            class="search-bar m-0" 
            :class="this.store.suggestionsOpen && Object.keys(store.suggestions).length > 0 ? 'search-bar-open' : 'serch-bar-close'"
            placeholder="Search" 
            @input="fetchCities"
          />
          <button class="search-btn m-0" type="submit" :class="this.store.suggestionsOpen && Object.keys(store.suggestions).length > 0 ? 'btn-search-bar-open' : 'btn-search-bar-close'">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <!-- Tendina dei suggerimenti -->
          <ul v-if="store.suggestions && Object.keys(store.suggestions).length && this.store.suggestionsOpen" class="suggestions-list">
            <li 
              v-for="(suggestion, index) in store.suggestions" 
              :key="index" 
              @click="updateSelectCity(suggestion.name, suggestion.country )"
            >
              {{ suggestion.name }}, {{ suggestion.country }}
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.search-bar-container {
  display: flex;
  align-items: center;
  max-width: 350px;
  position: relative; 
}

.search-bar {
  padding: 10px 20px;
  border: 0;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 1rem;
  width: 250px;
  outline: none;
}
.search-bar-open{
  border-radius: 21px 0 0 0px;
  
}
.btn-search-bar-open{
  border-radius: 0 21px 0px 0;
  
}
.btn-search-bar-close{
  border-radius: 0 50px 50px 0;
  
}
.serch-bar-close{
  border-radius: 50px 0 0 50px;

}

.search-bar::placeholder {
  color: white;
}

.search-btn {
  padding: 10px 20px;
  border: none;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.search-btn:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

/* Tendina dei suggerimenti */
.suggestions-list {
  position: absolute;
  top: 100%; 
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0 0 15px 15px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  z-index: 100;
}

.suggestions-list li {
  padding: 10px 20px;
  cursor: pointer;
  color: white;
}

.suggestions-list li:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.location-btn{
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  font-size: 1.8rem;
  padding: 0;
}
.location-permitted{
  color: white;
  cursor: pointer;

}
.location-denied{
  color: gray;
  cursor: not-allowed !important;
}
</style>
