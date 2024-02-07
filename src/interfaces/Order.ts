export default interface Order {
    id: number
    user_id: string,
    products: object[],
    data_time: string,
    time_zone: string
}