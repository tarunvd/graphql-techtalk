import {
    Arg,
    ID,
    Mutation,
    Query,
    Resolver
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

    @Mutation(returns => Developer)
    public async createDeveloper(
        @Arg("title") title: string,
        @Arg("name") name: string
    ) {
        const newDeveloper = new DeveloperModel({
            title,
            name
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
}
