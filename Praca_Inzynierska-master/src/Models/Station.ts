export interface Station {
  id: number,
  location: {
    latitude: number,
    longitude: number
  },
  address: {
    country: string,
    city: string,
    street: string,
    number: string,
    displayAddress1: string,
    displayAddress2: string
  },
  elevation: 220.38,
  airly: boolean,
  sponsor: {
    id:number,
    name: string,
    description: string,
    logo: string,
    link: string
  }
}
