import { defineStore } from 'pinia'

export interface State {
  city: string | null
  today: Weather | null
  nextDays: Weather[] | null
  averageTemperature: number | null
}

let sending = false

export const useWeatherStore = defineStore('weather', {
  state: (): State => {
    return {
      city: null,
      today: null,
      nextDays: null,
      averageTemperature: null
    }
  },
  actions: {
    async hydrate(host = 'localhost', cityName = 'malaga'): Promise<State> {
      if (sending) {
        return this
      }

      try {
        sending = true
        const response = await fetch(`http://${host}:8080/weather/${cityName}`)
        sending = false
        const json = await response.json()

        this.city = json.city
        this.today = json.today
        this.nextDays = json.nextDays
        this.averageTemperature = json.averageTemperature

      } catch (error) {
        sending = false
        this.$reset()
      }

      return this
    }
  }
})

export interface Weather {
  dateTime: string
  type: string
  temperature: number
  isCelsius: boolean
}
