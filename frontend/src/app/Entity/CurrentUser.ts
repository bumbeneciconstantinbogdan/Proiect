import { Authority } from "./authority";

export interface CurrentUser {
    id: string;
    username: string;
    password: string;
    email: string;
    authorities: Authority[];
    enabled: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}
    
