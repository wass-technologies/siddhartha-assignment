import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/enum';



 export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}

export class CreateAccountDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
  @IsString()
  name:string;

  @IsEnum(UserRole)
  role:UserRole;
}
export class ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}


