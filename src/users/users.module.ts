/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UserService } from './users.service';
import { UsersController } from "./users.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
    controllers: [UsersController],
    providers: [UserService],
    imports: [
       MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]), 
    ],
})
export class UsersModule {}