/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Comment } from './schema/comment.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
    ) {}

    create(createCommentDto: CreateCommentDto) {
        const createdComment = this.commentModel.create({
            text: createCommentDto.text,
            parent: createCommentDto.parentId || null,
            user: createCommentDto.userId,
        });
        return createdComment.then((doc) => {
            return doc.populate(['user', 'parent']);
        });
    }

    findAll() {
        return this.commentModel.find().populate(['user', 'parent']).exec();
    }

    getCommentsByParentId(parentId: string) {
        return this.commentModel
            .find({
                parent: parentId,
            })
            .populate(['user', 'parent'])
            .sort({ createdAt: -1 })
            .exec();
    }

    findOne(id: string) {
        return this.commentModel.findById(id).populate(['user', 'parent']).exec();
    }

    async patch(id: string, updateCommentDto: UpdateCommentDto) {
        const existingComment = await this.commentModel.findById(id).exec();
        if (!existingComment) {
            throw new Error(`Comment with ID ${id} not found`);
        }
        
        // Apply partial updates from updateCommentDto to existingComment
        Object.assign(existingComment, updateCommentDto);
    
        return existingComment.save();
    }

    async remove(id: string) {
        return this.commentModel.findByIdAndDelete(id).exec();
    }    
}
