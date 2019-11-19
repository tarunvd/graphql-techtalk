import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";

@ObjectType()
export class Todo {

    @Field(type => ID)
    // tslint:disable-next-line: variable-name
    public readonly _id: string;

    @prop()
    @Field()
    public title: string;

    @prop()
    @Field()
    public dueDate: Date;

    @prop()
    @Field()
    public complete: boolean;
}

export const TodoModel = getModelForClass(Todo);
