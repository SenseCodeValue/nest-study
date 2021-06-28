import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Body,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return '영화 다 리턴';
  }

  @Get('search')
  search(@Query('year') searchingYear: string): string {
    return `searching after ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string): string {
    return `${movieId}만 반환할꺼야~`;
  }

  @Post()
  create(@Body() movieData): string {
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') movieId: string): string {
    return `${movieId} is delete`;
  }

  @Patch(':id')
  update(@Param('id') movieId: string, @Body() movieData): any {
    return {
      updatedMovie: movieId,
      ...movieData,
    };
  }
}
