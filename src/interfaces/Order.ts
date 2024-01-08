export default interface Order {
    user_id: string,
    products: object[],
    data_time: string,
    time_zone: string
}