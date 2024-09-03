import { IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class RegisterCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @IsDefined()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @IsDefined()
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
