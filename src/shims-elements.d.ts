import { ComponentCustomProperties} from 'vue'
import { Route } from 'vue-router'
declare module '*.vue' {
    interface ComponentCustomProperties {
        $route: unknown
        $router: unknown
        beforeRouteEnter?(to: Route, from: Route, next: () => void): void
        params: number | string
        $translate: (key: string) => string
    }
    export default {}
}
declare module "*.jpeg" {
    const value: any;
    export default value;
}
