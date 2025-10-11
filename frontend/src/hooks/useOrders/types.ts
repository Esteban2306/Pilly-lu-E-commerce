export interface Order {
    _id: string;
    total: number;
    status: string;
    createdAt: string;
    updateAt: string;
    user: {
        name: string;
        email: string
    };
}

export interface FiltersRole {
    search: string;
    status: string;
    createdAt?: string;
    dateFrom: string;
    dateTo: string;
    sort: string
} 