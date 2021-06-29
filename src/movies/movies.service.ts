import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
	private movies: Array<Movie> = [];

	getAll(): Array<Movie> {
		return this.movies;
	}

	getOne(id: string): Movie {
		const movie = this.movies.find((movie) => movie.id == +id);
		if (!movie)
			throw new NotFoundException(`Movie with Id: ${id} not found.`);
		return movie;
	}

	deleteOne(id: string): boolean {
		this.getOne(id);
		this.movies = this.movies.filter((movie) => movie.id != +id);
		return true;
	}

	create(movieData) {
		this.movies.push({
			id: this.movies.length + 1,
			...movieData,
		});
	}

	update(id: string, updateData) {
		const moive = this.getOne(id);
		this.deleteOne(id);
		this.movies.push({ ...moive, ...updateData });
	}
}
