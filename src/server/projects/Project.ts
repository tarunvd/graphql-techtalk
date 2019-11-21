import { Field, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
export class Project {

    @Field()
    @prop()
    public name: string;

    @Field()
    @prop()
    public client: string;

    @Field()
    @prop()
    public current: boolean;
}
