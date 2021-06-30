import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'TEST',
        year: 1234,
        genre: ['TEST_GENRE'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(1111);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('should throw 404 error', () => {
      try {
        service.create({
          title: 'TEST',
          year: 1234,
          genre: ['TEST_GENRE'],
        });
        service.deleteOne(1);
        service.getOne(1);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createOne', () => {
    it('should create a movie', () => {
      const beforeCreated = service.getAll().length;
      service.create({
        title: 'TEST',
        year: 1234,
        genre: ['TEST_GENRE'],
      });
      const afterCreated = service.getAll().length;
      expect(afterCreated).toBeGreaterThan(beforeCreated);
    });
  });

  describe('update', () => {
    it('should change title', () => {
      service.create({
        title: 'TEST',
        year: 1234,
        genre: ['TEST_GENRE'],
      });
      service.update(1, { title: 'UPDATED_TITLE' });
      const afterChange = service.getOne(1).title;
      expect(afterChange).toEqual('UPDATED_TITLE');
    });
  });
});
