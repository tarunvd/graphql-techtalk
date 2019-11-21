import * as React from "react";
import gql from "graphql-tag";
import { Button, List } from "@stardust-ui/react";
import { useQuery } from "react-apollo";
import { Link, RouteComponentProps } from "react-router-dom";

import { Developer } from "../../server/developers/Developer";

const GET_DEVELOPERS = gql`
    query {
        developers {
            _id
            title
            name
        }
    }
`;

interface QueryResult {
    developers: Developer[];
}

const DeveloperList: React.FunctionComponent<RouteComponentProps> = () => {

    const { loading, data } = useQuery<QueryResult>(GET_DEVELOPERS);

    if (loading) {
        return <>Loading...</>;
    }

    const developers = data?.developers.map(d => ({
        key: d._id,
        header: d.name,
        headerMedia: d.title
    })) ?? [];

    return (
        <>
            <List items={developers} />
            <Button content="Add developer" as={Link} to="/add" />
        </>
    );
};

export { DeveloperList };
