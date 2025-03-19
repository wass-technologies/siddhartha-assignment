import { IsNotEmpty, IsString } from "class-validator";

export class CreateClassDto {

    @IsNotEmpty()
    @IsString()
    name:string;

    
}
