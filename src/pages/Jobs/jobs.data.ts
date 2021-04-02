import { JobDTO } from 'rest';
import momemt from 'moment';

export const jobs: JobDTO[] = [
    {
        id: 1,
        address: 'test1234',
        business: 'hejo',
        registrationDate: momemt(new Date()),
        forkMin: 7000,
        formMax: 12000,
        yourRate: 10000,
        businessResponse: false
    }
]