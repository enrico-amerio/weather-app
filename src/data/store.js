import { reactive } from 'vue'

export const store = reactive({
  APIKey: import.meta.env.VITE_API_KEY,
  getCityCoordinates:"http://api.openweathermap.org/geo/1.0/direct?",
  getCityWeather:"https://api.openweathermap.org/data/2.5",
  searchBarValue: "",
  serchedCity: "",
  lat:"",
  lon:"",
  suggestions:{},
  suggestionsOpen: false,
  selectedCity:[],
  selectedCountry:'IT',
  currentWeather:{},
  currentAirQuality:"",
  currentDate:"",
  todaysWeather:[],
  nextHours:[],
  nextDaysWeather:[],
  nextDaysPreview:[],
  errorText:'',
  getLocationPermitted: false
})