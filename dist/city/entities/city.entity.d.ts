import { Area } from 'src/area/entities/area.entity';
import { State } from 'src/state/entities/state.entity';
export declare class City {
    id: number;
    name: string;
    status: boolean;
    stateId: number;
    state: State[];
    area: Area;
}
