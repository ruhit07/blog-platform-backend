import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateBlogDto, FilterBlogDto, BlogResponseDto, UpdateBlogDto } from '../dtos';
import { BlogService } from '../services/blog.service';

@Controller('posts')
export class BlogController {
  private logger = new Logger(BlogController.name);

  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async getBlogs(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterBlogDto: FilterBlogDto,
  ): Promise<BaseApiSuccessResponse<BlogResponseDto[]>> {
    const blogs = await this.blogService.getBlogs(ctx, filterBlogDto);

    return {
      success: true,
      statusCode: 200,
      message: `List of Blogs`,
      data: blogs,
    };
  }

  @Get('/:id')
  async getBlog(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<BlogResponseDto>> {
    const blog = await this.blogService.getBlog(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of Blog of id: ${id}`,
      data: blog,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createBlog(
    @RequestContext() ctx: RequestContextDto,
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<BaseApiSuccessResponse<BlogResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating new Blog`);

    const blog = await this.blogService.createBlog(ctx, createBlogDto);

    return {
      success: true,
      statusCode: 201,
      message: `New Blog created of id ${blog.id}`,
      data: blog,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateBlog(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<BaseApiSuccessResponse<BlogResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating Blog of id ${id}.`);

    const blog = await this.blogService.updateBlog(ctx, id, updateBlogDto);

    return {
      success: true,
      statusCode: 200,
      message: `Blog of id ${id} updated`,
      data: blog,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteBlog(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<BlogResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting a Blog. of id: ${id}`);

    const blog = await this.blogService.deleteBlog(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Blog of id ${id} delted`,
      data: blog,
    };
  }
}
