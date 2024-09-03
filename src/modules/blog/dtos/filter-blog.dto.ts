import { IsString, IsUUID } from 'class-validator';

export class FilterBlogDto {
  @IsUUID('4')
  authorId: string;

  @IsString()
  title: string;
}
