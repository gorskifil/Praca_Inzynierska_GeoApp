import FpLoaderBus from './FpLoaderBus'
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface FpAxiosConfig extends AxiosRequestConfig{
  removeDefaultHeaders?: boolean
}

export class FpAxios {
  static BaseUrl?: string;
  static tokenGetter?: () => string | null;
  static revokeToken?: (response: AxiosResponse) => void;
  static onUnauthorized?: (error: AxiosError) => void;
  static onForbidden?: (error: AxiosError) => void;
  static onBadRequest?: (error: AxiosError) => void;
  static onNotFound?: (error: AxiosError) => void;
  static onServerError?: (error: AxiosError) => void;
  static on502?: (error: AxiosError) => void;
  static serverMessages = false;
  static defaultHeaders?: Record<string, string>;

  public static create (fpAxiosConfig?: FpAxiosConfig) {
    const axiosInstance: AxiosInstance = Axios.create()
    axiosInstance.interceptors.request.use((config) => {
      if (this.defaultHeaders && (!fpAxiosConfig || fpAxiosConfig.removeDefaultHeaders === false)) {
        config.headers = Object.assign(this.defaultHeaders, config.headers)
      }

      config.baseURL = this.BaseUrl
      FpLoaderBus.$emit('loaderStateChange', true)
      if (this.tokenGetter && this.tokenGetter()) {
        config.headers.authorization = `Bearer ${this.tokenGetter()}`
      }
      return config
    }, (error) => {
      FpLoaderBus.$emit('loaderStateChange', false)
      return Promise.reject(error)
    })

    axiosInstance.interceptors.response.use((response) => {
      if (this.revokeToken && this.revokeToken(response) && this.onUnauthorized) {
        this.revokeToken(response)
      }
      FpLoaderBus.$emit('loaderStateChange', false)
      return response
    }, (error: AxiosError) => {
      if (error.response && Number(error.response.status) >= 500) {
        if (this.onServerError) {
          this.onServerError(error)
        }
      }

      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (this.onBadRequest) {
              this.onBadRequest(error)
            }
            break
          case 401:
            if (this.onUnauthorized) {
              this.onUnauthorized(error)
            }
            break
          case 403:
            if (this.onForbidden) {
              this.onForbidden(error)
            }
            break
          case 404:
            if (this.onNotFound) {
              this.onNotFound(error)
            }
            break
          case 502:
            if (this.on502) {
              this.on502(error)
            }
            break
        }
      }
      FpLoaderBus.$emit('loaderStateChange', false)
      return Promise.reject(error)
    })
    return axiosInstance
  }
}
