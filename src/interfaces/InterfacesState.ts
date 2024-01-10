export interface StateForSignUp {
    nameUser: string
    emailAdress: string
    password: string
    confirmpassword: string
}

export interface StateUserData {
    id: string
    login: string,
    first_name: string,
    last_name: string,
    email: string,
    number_phone: string,
    cart_bank: string
}

export interface VuexStateInterface {
    id: number | null,
    user_id: string | number | null,
    user_login: string | null,
    user_first_name: string | null,
    user_last_name: string | null,
    user_email: string | null,
    user_number_phone: string | null,
    user_cart_bunk_number: string | null
}