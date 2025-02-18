import { IsEmail, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class SignUpRequestDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  @IsPositive()
  @Min(18)
  age: number;

}
