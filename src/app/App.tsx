import * as React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Box, Flex, FlexItem, Menu, Segment } from "@stardust-ui/react";

import { TodoList } from "./todos/TodoList";

export const App: React.FC = () => (
    <section>
        <Router>
            <Flex column styles={{ height: "100%"}}>
                <FlexItem shrink={false}>
                    <Segment styles={{ padding: "0.25rem", borderBottom: "solid 0.0714rem rgb(225, 223, 221)" }}>
                        <Menu
                            pills
                            items={[
                                { icon: "menu", key: "home", as: Link, to: "/" }
                            ]}
                        />
                    </Segment>
                </FlexItem>
                <FlexItem grow styles={{ position: "relative" }}>
                    <div>
                        <Box styles={{ position: "absolute", height: "100%", width: "60%", marginLeft: "20%" }}>
                            <Route exact path="/" component={TodoList} />
                        </Box>
                    </div>
                </FlexItem>
            </Flex>
        </Router>
    </section>
);
