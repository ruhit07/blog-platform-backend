import { Expose } from 'class-transformer';

export class BlogResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  authorId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
