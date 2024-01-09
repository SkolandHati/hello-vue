import {RouteRecordRaw} from "vue-router";

export type Nullable<T> = T | null ;

export type Methot<T> = T | undefined

export const listObjectKeys = <Obj>(obj: Obj): (keyof Obj)[] => {
    return Object.keys(obj) as (keyof Obj)[];
}

export type RouterType = RouteRecordRaw