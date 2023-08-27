import { setActivePinia, createPinia } from 'pinia'
import { useOpenapiStore } from './openapi'
import { describe, beforeEach, it, expect } from 'vitest'

describe('Open api Store', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
    })
  
    it('hydrate', async() => {
      const openapi = useOpenapiStore()
      expect(openapi.openapi).toBe(null)
      await openapi.hydrate('backend')
      expect(openapi.openapi).toBe("3.0.3")
    })
  })