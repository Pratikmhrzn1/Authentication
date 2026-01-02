import { IsEmail, IsString, MinLength, IsOptional, IsNumber } from 'class-validator';
export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsNumber()
  role?: number; //1=superadmin,2=normal-user,3=admin
}