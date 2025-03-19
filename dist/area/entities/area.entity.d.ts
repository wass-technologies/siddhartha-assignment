import { City } from 'src/city/entities/city.entity';
export declare class Area {
    id: number;
    name: string;
    pincode: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    cityId: number;
    city: City[];
}
