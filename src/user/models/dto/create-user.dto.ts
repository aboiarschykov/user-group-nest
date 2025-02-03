import {IsNumber, IsPositive, IsString, Min} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsNumber()
  @IsPositive()
  @Min(18)
  age: number;
}
