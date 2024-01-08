import { ComponentCustomProperties, CreateComponentPublicInstance } from 'vue'

declare module 'vue' {
    interface ComponentCustomProperties {
        $route: any
        $router: any
        params: number | string
        $translate: (key: string) => string
    }
}