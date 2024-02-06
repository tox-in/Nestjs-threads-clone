/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('CommentsService', () => {
    let service: CommentsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommentsService,
                {
                    provide: getModelToken('Comment'), // Assuming 'Comment' is the name of your Mongoose model
                    useValue: {
                        find: jest.fn(),
                        findById: jest.fn(),
                        create: jest.fn(),
                        // Add other methods as needed for your tests
                    } as unknown as Model<any>, // Use unknown as an intermediate step
                },
            ],
        }).compile();

        service = module.get<CommentsService>(CommentsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
