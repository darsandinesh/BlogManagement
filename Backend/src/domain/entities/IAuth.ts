export interface IUserModel {
    username: string,
    phone: string,
    email: string,
    password: string,
    bio?: string,
    avatar?: string
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUser {
    username: string,
    phone: string,
    email: string,
    password: string,
    bio?: string,
    avatar?: string
    name?:string
}

export interface ILogin {
    email: string,
    password: string
}