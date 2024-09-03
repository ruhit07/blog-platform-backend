import { IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @IsDefined()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @IsDefined()
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
