import { Query, Resolver, Mutation, Arg } from "type-graphql";

import { Todo, TodoModel } from "./Todo";

@Resolver()
export class TodoResolver {

    @Query(returns => [Todo])
    public async allTodos() {
        return await TodoModel.find().exec();
    }


    @Mutation(returns => Todo)
    public async createTodo(
        @Arg("title") title: string,
        @Arg("dueDate") dueDate: Date
    ) {
        const newTodo = new TodoModel({
            title,
            dueDate,
            complete: false
        });

        return await newTodo.save();
    }
}
