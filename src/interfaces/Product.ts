export default interface Product {
    id: number
    id_product: number
    image_product: string
    name_product: string
    product_brend: string
    price_product: number
    quantity: number
}

export interface AllProduct {
    [key: string | number]: Product
}