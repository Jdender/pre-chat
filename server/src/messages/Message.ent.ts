import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@Entity()
@ObjectType()
export class Message {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    content: string;
}
