import { RequestContextDto } from '@common/dtos/request-context.dto';
import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto, FilterBlogDto, UpdateBlogDto } from '../dtos';
import { BlogEntity } from '../entities/blog.entity';
import { Repository } from 'typeorm';
import { UserService } from '@modules/user/services/user.service';

@Injectable()
export class BlogService {
  private logger = new Logger(BlogService.name);

  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepo: Repository<BlogEntity>,
    private readonly userService: UserService,
  ) {}

  async getBlogs(ctx: RequestContextDto, filterBlogDto: FilterBlogDto): Promise<BlogEntity[]> {
    this.logger.log(`${this.getBlogs.name} Called`);

    const { authorId, title } = filterBlogDto;

    const qb = this.blogRepo
      .createQueryBuilder('blog')
      .select(['blog', 'author.id', 'author.username', 'author.email']);

    if (title) qb.where('blog.title = :title', { title });
    if (authorId) qb.where('blog.authorId = :authorId', { authorId });

    qb.leftJoin('blog.author', 'author');
    qb.orderBy('blog.createdAt', 'DESC');

    const result = await qb.getMany();

    return result;
  }

  async getBlog(ctx: RequestContextDto, id: string): Promise<BlogEntity> {
    this.logger.log(`${this.getBlog.name} Called`);

    const qb = this.blogRepo
      .createQueryBuilder('blog')
      .select(['blog', 'author.id', 'author.username', 'author.email'])
      .where('blog.id = :id', { id })
      .leftJoin('blog.author', 'author');

    const result = await qb.getOne();

    return result;
  }

  async createBlog(ctx: RequestContextDto, createBlogDto: CreateBlogDto): Promise<BlogEntity> {
    this.logger.log(`${this.createBlog.name} Called`);

    const author = await this.userService.findUser(createBlogDto.authorId);
    if (!author) {
      throw new NotFoundException(`Author of id ${createBlogDto.authorId} not found`);
    }

    const blog = this.blogRepo.create(createBlogDto);
    return this.blogRepo.save(blog);
  }

  async updateBlog(ctx: RequestContextDto, id: string, updateBlogDto: UpdateBlogDto): Promise<BlogEntity> {
    this.logger.log(`${this.updateBlog.name} Called`);

    const blog = await this.blogRepo.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog of id ${id} not found`);
    }

    if (blog.authorId !== ctx.user?.id) {
      throw new ForbiddenException('Only the author can update');
    }
    console.log(updateBlogDto);
    this.blogRepo.merge(blog, updateBlogDto);
    return this.blogRepo.save(blog);
  }

  async deleteBlog(ctx: RequestContextDto, id: string): Promise<BlogEntity> {
    this.logger.log(`${this.deleteBlog.name} Called`);

    const blog = await this.blogRepo.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog of id ${id} not found`);
    }

    if (blog.authorId !== ctx.user?.id) {
      throw new ForbiddenException('Only the author can delete');
    }

    return this.blogRepo.remove(blog);
  }
}
