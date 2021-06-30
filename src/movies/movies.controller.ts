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
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMoiveDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
	constructor(private readonly movieService: MoviesService) {}

	@Get()
	getAll(): Array<Movie> {
		return this.movieService.getAll();
	}

	@Post()
	create(@Body() movieData: CreateMovieDTO): void {
		return this.movieService.create(movieData);
	}

	@Delete(':id')
	remove(@Param('id') movieId: number): boolean {
		return this.movieService.deleteOne(movieId);
	}

	@Patch(':id')
	update(
		@Param('id') movieId: number,
		@Body() movieData: UpdateMoiveDTO,
	): any {
		return this.movieService.update(movieId, movieData);
	}

	@Get(':id')
	getOne(@Param('id') movieId: number): Movie {
		return this.movieService.getOne(movieId);
	}
}
