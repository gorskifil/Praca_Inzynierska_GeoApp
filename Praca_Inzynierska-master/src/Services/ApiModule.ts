import { FpAxios } from 'fp-components'
import { Station } from '@/Models/Station'
import Airly from 'airly'
import { InstallationInfo } from '@/Models/InstallationInfo'

class ApiModule {
  private clientAxios = FpAxios.create();
  private baseUrl = 'https://airapi.airly.eu'
  private apiKey = 's6DVNlH8yVhOJthU8tVFjHTHRwPhsZsj'
  private weatherApiKey = 'f22fd9053a5fb36b7f26b17147f60e19'
  private airly = new Airly(this.apiKey)
  private lat = 54.4418
  private lng = 18.56003
  private maxDistanceKM = 100
  private maxResults = 500
  private indexType = 'AIRLY_CAQI'

  async getWeather (): Promise<any> {
    try {
      const response = await this.clientAxios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lng}&appid=${this.weatherApiKey}`)
      return response.data.daily
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }

  async getNearestInstallations (): Promise<Array<Station>> {
    try {
      const response = await this.airly.nearestInstallations(
        this.lat,
        this.lng,
        this.maxDistanceKM,
        this.maxResults
      )
      return response
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }

  async getStationMeasurementsById (id:number): Promise<InstallationInfo> {
    try {
      const response = await this.airly.installationMeasurements(id)
      return response
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }
}
export default new ApiModule()
