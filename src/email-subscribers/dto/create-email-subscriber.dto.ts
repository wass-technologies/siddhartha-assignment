import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEmailSubscriberDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    email: string;
}
