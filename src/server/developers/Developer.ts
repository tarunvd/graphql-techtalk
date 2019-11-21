import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";

import { Project } from "../projects/Project";

@ObjectType()
export class Developer {

    @Field(type => ID)
    // tslint:disable-next-line: variable-name
    public readonly _id: string;

    @prop()
    @Field()
    public title: string;

    @prop()
    @Field()
    public name: string;

    @prop()
    @Field({ deprecationReason: "Replaced with startDate", nullable: true })
    public started: Date;

    @prop()
    @Field()
    public startDate: Date;

    @prop()
    @Field(type => [Project])
    public projects: Project[];

    @prop()
    @Field()
    public fired: boolean;
}

export const DeveloperModel = getModelForClass(Developer);
