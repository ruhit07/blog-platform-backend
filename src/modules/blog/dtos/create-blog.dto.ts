import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;

  @IsUUID('4')
  @IsDefined()
  authorId: string;
}
