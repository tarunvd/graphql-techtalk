import * as React from "react";
import { Button, Form, FormFieldProps, Input, InputProps, ShorthandValue } from "@stardust-ui/react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router-dom";

import { Developer } from "../../server/developers/Developer";

const UPDATE_DEVELOPER = gql`
    mutation UpdateDeveloper(
        $id: ID!,
        $title: String!,
        $name: String!
    ) {
        updateDeveloper(
            id: $id
            name: $name
            title: $title
        ) {
            _id
        }
    }
`;

type UpdateDeveloperState = Pick<Developer, "_id" | "title" | "name">;

const UpdateDeveloper: React.FunctionComponent = () => {

    const [state, setState] = React.useState<UpdateDeveloperState>({
        _id: "",
        name: "",
        title: ""
    });

    const history = useHistory();

    const [updateDeveloper] = useMutation<UpdateDeveloperState>(
        UPDATE_DEVELOPER,
        {
            onCompleted: () => history.push("/")
        }
    );

    const submit = (event) => {
        event.preventDefault();
        updateDeveloper({ variables: { ...state }})
    };

    const fields: ShorthandValue<FormFieldProps & InputProps>[] = [
        {
            key: "id",
            label: "Id",
            name: "Id",
            required: true,
            control: {
                as: Input,
                onChange: (_, data) => setState({ ...state, _id: data.value })
            }
        },
        {
            key: "name",
            label: "Name",
            name: "name",
            required: true,
            control: {
                as: Input,
                onChange: (_, data) => setState({ ...state, name: data.value })
            }
        },
        {
            key: "title",
            label: "Title",
            name: "title",
            required: true,
            control: {
                as: Input,
                onChange: (_, data) => setState({ ...state, title: data.value })
            }
        },
        {
            control: {
                as: Button,
                content: "Submit",
            },
            key: "submit",
        }
    ];

    return (
        <>
            <h2>Update Developer</h2>
            <Form onSubmit={submit} fields={fields} />
        </>
    )
};

export { UpdateDeveloper };
