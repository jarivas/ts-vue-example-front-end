import { setActivePinia, createPinia } from 'pinia'
import { useWeatherStore } from './weather'
import { describe, beforeEach, it, expect } from 'vitest'

describe('Weather Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('hydrate', async () => {
    const weather = useWeatherStore()
    expect(weather.city).toBe(null)
    await weather.hydrate('backend')
    expect(weather.city).toBe('malaga')
  })
})
