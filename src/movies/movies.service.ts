import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMoiveDTO } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
	private movies: Array<Movie> = [];

	getAll(): Array<Movie> {
		return this.movies;
	}

	getOne(id: number): Movie {
		const movie = this.movies.find((movie) => movie.id == id);
		if (!movie)
			throw new NotFoundException(`Movie with Id: ${id} not found.`);
		return movie;
	}

	deleteOne(id: number): boolean {
		this.getOne(id);
		this.movies = this.movies.filter((movie) => movie.id != id);
		return true;
	}

	create(movieData: CreateMovieDTO) {
		this.movies.push({
			id: this.movies.length + 1,
			...movieData,
		});
	}

	update(id: number, updateData: UpdateMoiveDTO) {
		const moive = this.getOne(id);
		this.deleteOne(id);
		this.movies.push({ ...moive, ...updateData });
	}
}
