<template>
  <v-app id="inspire">
    <v-app-bar
      app
      class="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title >Geo App</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      width="300"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Weather
          </v-list-item-title>
          <v-list-item-subtitle>
            Temperature and pressure
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
          :key="index"
          v-for="(item, index) in weather"
        >
          <div class="py-4">
          <v-card-subtitle class="font-weight-medium font-italic text-body-1 green--text pa-2" v-if="index === 0">Today</v-card-subtitle>
            <v-card-subtitle class="font-weight-medium font-italic text-body-1 red--text pa-2" v-else-if="index === 1">Tomorrow</v-card-subtitle>
            <v-card-subtitle class="font-weight-medium font-italic text-body-1 blue--text pa-2" v-else>{{index + 1}}th day</v-card-subtitle>
          <v-list-item class="pb-8 pt-2">
            <v-row>
              <v-col>
                <v-icon color="yellow">mdi-weather-sunny</v-icon>
                <v-list-item-title class="font-italic font-weight-medium pt-2 justify-space-between">Day - {{(item.temp.day - 273.15).toFixed(2)}}°C</v-list-item-title>
              </v-col>
              <v-col>
                <v-icon color="blue">mdi-weather-night</v-icon>
            <v-list-item-title class="font-italic font-weight-medium pt-2 justify-space-between">Night -  {{(item.temp.night - 273.15).toFixed(2)}}°C</v-list-item-title>
              </v-col>
              <v-col>
                <v-icon color="green">mdi-arrow-up</v-icon>
            <v-list-item-title class="font-italic font-weight-medium pt-2 justify-space-between">Max -  {{(item.temp.max - 273.15).toFixed(2)}}°C</v-list-item-title>
              </v-col>
              <v-col>
                <v-icon color="red">mdi-arrow-down</v-icon>
            <v-list-item-title class="font-italic font-weight-medium pt-2 justify-space-between">Min -  {{(item.temp.min - 273.15).toFixed(2)}}°C</v-list-item-title>
              </v-col>
              <v-col>
                <v-icon color="purple">mdi-arrow-collapse-down</v-icon>
            <v-list-item-title class="font-italic font-weight-medium pt-2 justify-space-between">Pressure -  {{(item.pressure).toFixed(2)}} hPa</v-list-item-title>
              </v-col>
            </v-row>
          </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <Map/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Map from '@/components/Map.vue'
import ApiModule from '@/Services/ApiModule'

@Component({
  components: { Map }
})
export default class Home extends Vue {
  public drawer = true
  public weather:any = null

  async mounted () {
    const weatherResponse = await ApiModule.getWeather()
    console.log(weatherResponse)
    this.weather = weatherResponse
  }
}
</script>
