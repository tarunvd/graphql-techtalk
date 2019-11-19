import * as React from "react";
import gql from "graphql-tag";
import { List } from "@stardust-ui/react";
import { useQuery } from "react-apollo";

import { Todo } from "../../server/todos/Todo";

const GET_TODOS = gql`
    query {
        allTodos {
            _id
            title
            dueDate
            complete
        }
    }
`;

interface QueryResult {
    allTodos: Todo[];
}

const TodoList: React.FunctionComponent = () => {

    const { loading, data } = useQuery<QueryResult>(GET_TODOS);

    if (loading) {
        return <>Loading...</>;
    }

    const todos = data?.allTodos.map(d => ({
        key: d._id,
        header: d.title,
        headerMedia: d.dueDate
    })) ?? [];

    return (
        <List items={todos} />
    );
};

export { TodoList };
