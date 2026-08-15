export interface Contact{
    id?:number;
    name:string;
    lastName?:string;
    email:string;
    phone:string;
}

export interface ContactState
 {
    contacts: Contact[];
    query: string;
    loading:boolean;
    error:string | null;
}