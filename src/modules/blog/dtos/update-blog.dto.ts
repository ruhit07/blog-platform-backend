import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID('4')
  authorId: string;
}
