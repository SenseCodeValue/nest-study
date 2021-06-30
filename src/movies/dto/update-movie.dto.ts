import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDTO } from './create-movie.dto';

export class UpdateMoiveDTO extends PartialType(CreateMovieDTO) {}
