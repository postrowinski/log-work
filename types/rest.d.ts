import moment from 'moment';

export interface ExampleFormDTO {
    name: string;
}

export interface IdentifiableDTO {
    id: number;
}

export interface JobDTO extends IdentifiableDTO {
    registrationDate: moment.Moment;
    business: string;
    address: string;
    forkMin?: number;
    formMax?: number;
    yourRate?: number;
    businessResponse?: boolean;
    description?: string;
}