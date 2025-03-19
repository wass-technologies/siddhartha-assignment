import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateMainAdminDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsNotEmpty()
  name: string;
}

export class CreateSubAdminDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  schoolId: string;
 }

 

 export class CreateUserDto {
   @IsEmail()
   email: string;
 
   @IsNotEmpty({ message: 'Password cannot be empty' })
   @MinLength(6, { message: 'Password must be at least 6 characters' })
   password: string;
 
   @IsNotEmpty()
   name: string;
 }

 export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}

