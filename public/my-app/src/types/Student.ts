export interface Student {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    userRole?: string;
    createdAt?: string;
    updatedAt?: string | null;
    responsibleCPF?: string;
    registration?: string;
    birthday?: string;
    points?: number;
    age?: number;
    enabled?: boolean;
    authorities?: Authority[];
    username?: string;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
}

export interface Authority {
    authority?: string;
}
