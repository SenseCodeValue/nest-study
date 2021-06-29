import {
	Controller,
	Get,
	Param,
	Post,
	Delete,
	Patch,
	Body,
} from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
	constructor(private readonly movieService: MoviesService) {}

	@Get()
	getAll(): Array<Movie> {
		return this.movieService.getAll();
	}

	@Post()
	create(@Body() movieData): void {
		return this.movieService.create(movieData);
	}

	@Delete(':id')
	remove(@Param('id') movieId: string): boolean {
		return this.movieService.deleteOne(movieId);
	}

	@Patch(':id')
	update(@Param('id') movieId: string, @Body() movieData): any {
		return this.movieService.update(movieId, movieData);
	}

	@Get(':id')
	getOne(@Param('id') movieId: string): Movie {
		return this.movieService.getOne(movieId);
	}
}
