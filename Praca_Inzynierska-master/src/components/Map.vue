<template>
  <div>
    <!-- komponent googla -->
  <GmapMap :center="{lat:54.4418, lng:18.56003}"
           :zoom="10"
           style="width: 100vw; height: 92.5vh"
           >
     <GmapMarker
       v-for="(item,index) in installationsArray"
       :key="index"
       :position="{lat:item.location.latitude,lng: item.location.longitude}"
       @click="getStationMeasurements(item.id)"
     />
  </GmapMap>
    <v-row justify="center" v-if="installationInfo">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600"
        >
        <v-card>
          <v-card-title class="px-5 text-h5 green--text">
            {{installationInfo.current.indexes[0].description}}
          </v-card-title>
          <h4 class="mx-6 my-3 blue--text">Current values</h4>
          <v-card-text>
            <div :key="index" v-for="(x,index) in installationInfo.current.values">
              <v-row class="py-0">
                <v-col cols="3">
                  <p class="ma-0 font-weight-medium font-italic text-decoration-underline">{{x.name}}</p>
                </v-col>
                <v-col cols="5">
              <p class="ma-0">{{x.value}}</p>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <h4 class="mx-6 my-3 blue--text">Forecast values</h4>
          <v-card-text>
            <div class="py-4" :key="index" v-for="(x,index) in installationInfo.forecast">
              <v-row>
                <v-card-subtitle class="font-weight-medium font-italic text-body-1 green--text pa-2" v-if="index === 0">Tomorrow</v-card-subtitle>
                <v-card-subtitle class="font-weight-medium font-italic text-body-1 blue--text pa-2" v-else>{{index + 1}}th day</v-card-subtitle>
              </v-row>
              <v-row class="py-0">
                <v-col cols="3">
                <p class="ma-0 font-weight-medium font-italic text-decoration-underline">{{x.values[0].name}}</p>
                </v-col>
                <v-col cols="5">
                  <p class="ma-0">{{x.values[0].value}}</p>
                </v-col>
              </v-row>
              <v-row class="py-0">
                <v-col cols="3">
              <p class="ma-0 font-weight-medium font-italic text-decoration-underline">{{x.values[1].name}}</p>
                </v-col>
                <v-col cols="5">
                <p class="ma-0">{{x.values[1].value}}</p>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ApiModule from '@/Services/ApiModule'
import { Station } from '@/Models/Station'
import { InstallationInfo } from '@/Models/InstallationInfo'

@Component({
  components: { }
})

export default class Map extends Vue {
  public installationsArray:Station[] | null = null
  public installationInfo:InstallationInfo | null = null
  public dialog = false

  async mounted ():Promise<void> {
    this.dialog = true
    const response = await ApiModule.getNearestInstallations()
    this.installationsArray = response
  }

  async getStationMeasurements (id:number): Promise<void> {
    const response = await ApiModule.getStationMeasurementsById(id)
    this.installationInfo = response
    this.dialog = true
  }
}
</script>
<style scoped lang="scss">
</style>
