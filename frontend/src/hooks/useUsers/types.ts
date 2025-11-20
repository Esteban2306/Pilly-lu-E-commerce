export interface Role {
    _id: string
    name: string
}

export interface User {
    _id: string
    firstName: string
    lastName: string
    fullName: string
    email: string
    createdAt: string
    role: Role | null
}

export interface Filters {
    search: string
    role: string
    page?: number
    limit?: number
}