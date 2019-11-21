import {
    Arg,
    FieldResolver,
    ID,
    Mutation,
    Query,
    Resolver,
    Root
} from "type-graphql";

import { Developer, DeveloperModel } from "./Developer";

@Resolver(of => Developer)
export class DeveloperResolver {

    @Query(returns => [Developer])
    public async developers(
        @Arg("project", { nullable: true }) project?: string
    ) {
        const filter = project !== undefined ? { "projects.name": project } : {};
        return await DeveloperModel.find(filter);
    }

    @FieldResolver()
    public projects(
        @Root() developer: Developer,
        @Arg("current", { nullable: true }) current?: boolean
    ) {
        let projects = developer.projects ?? [];

        if (current != null) {
            projects = projects.filter(p => p.current === current);
        }

        return projects;
    }

    @Mutation(returns => Developer)
    public async createDeveloper(
        @Arg("title") title: string,
        @Arg("name") name: string
    ) {
        const newDeveloper = new DeveloperModel({
            title,
            name,
            projects: [],
        });

        return await newDeveloper.save();
    }

    @Mutation(returns => Developer)
    public async assignDeveloperProject(
        @Arg("id", type => ID) id: string,
        @Arg("client") client: string,
        @Arg("name") name: string,
        @Arg("current", { nullable: true }) current: boolean = false
    ) {
        const developer = await DeveloperModel.findById(id).exec();

        const projects = developer?.projects ?? [];

        projects.push({
            client,
            name,
            current
        });

        await developer?.updateOne({ projects }).exec();
        return developer;
    }

    @Mutation(returns => Boolean)
    public async fireDeveloper(@Arg("id", type => ID) id: string): Promise<boolean> {

        const result = await DeveloperModel.findByIdAndUpdate(id, { projects: [], fired: true }, { new: true });
        return result?.fired ?? false;
    }

    @Mutation(returns => Boolean)
    public async deleteDeveloper(@Arg("id", type => ID) id: string): Promise<boolean> {

        const result = await DeveloperModel.findById(id).remove().exec();
        return result.deletedCount === 1;
    }
}
