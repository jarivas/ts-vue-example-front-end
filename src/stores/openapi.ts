import { defineStore } from 'pinia'

export interface State {
  openapi: string | null
  info: Info | null
  paths: Paths | null
  components: Components | null
}

export const useOpenapiStore = defineStore('openapi', {
  state: (): State => {
    return {
      openapi: null,
      info: null,
      paths: null,
      components: null
    }
  },
  actions: {
    async hydrate(host = 'localhost'): Promise<State> {
      try {
        const response = await fetch(`http://${host}:8080/openapi`)
        const json = await response.json()

        this.openapi = json.openapi
        this.info = json.info
        this.paths = json.paths
        this.components = json.components

      } catch (error) {
        this.$reset()
      }

      return this
    }
  }
})

export interface Info {
  title: string
  version: string
}

export interface Schema {
  type?: string
  $ref?: string
}

export interface Parameter {
  in: string
  name: string
  schema: Schema
  required: boolean
  description: string
}

export interface Method {
  summary: string
  parameters: Parameter[]
}

export interface Path {
  [index: string]: Method
}

export interface Paths {
  [index: string]: Path
}

export interface Property {
  type: string
}

export interface Properties {
  [index: string]: Property
}

export interface Component {
  type: string
  properties: Properties
  required: string[]
}

export interface Schemas {
  [index: string]: Component
}

export interface Components {
  schemas: Schemas
}
