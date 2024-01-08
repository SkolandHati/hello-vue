import { ComponentCustomProperties} from 'vue'
import VueRouter, { Route } from 'vue-router'

declare module '*.vue' {
    interface ComponentCustomProperties {
        $route: any
        $router: any
        beforeRouteEnter?(to: Route, from: Route, next: () => void): void
        params: number | string
        $translate: (key: string) => string
    }
    export default {}
}
