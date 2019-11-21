import * as React from "react";
import { ShorthandValue, FormFieldProps, InputProps, Input, Form, Button } from "@stardust-ui/react";
import gql from "graphql-tag";

import { Developer } from "../../server/developers/Developer";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router-dom";

const CREATE_DEVELOPER = gql`
    mutation CreateDeveloper(
        $title: String!,
        $name: String!
    ) {
        createDeveloper(
            title: $title,
            name: $name
        ) {
            _id
        }
    }
`;

type CreateDeveloperState = Pick<Developer, "title" | "name">;

const CreateDeveloper: React.FunctionComponent = () => {

    const [state, setState] = React.useState<CreateDeveloperState>({
        name: "",
        title: ""
    });

    const history = useHistory();

    const [createDeveloper] = useMutation<CreateDeveloperState>(
        CREATE_DEVELOPER,
        {
            onCompleted: () => history.push("/")
        }
    );

    const submit = (event) => {
        event.preventDefault();
        createDeveloper({ variables: { ...state }})
    };

    const fields: ShorthandValue<FormFieldProps & InputProps>[] = [
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
            <h2>Create Developer</h2>
            <Form onSubmit={submit} fields={fields} />
        </>
    )
};

export { CreateDeveloper };
