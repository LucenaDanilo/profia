export interface Teacher {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    userRole?: string;
    createdAt?: string;
    updatedAt?: string | null;
    cnpj?: string;
    hrAula?: number;
    especialidade?: string;
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
