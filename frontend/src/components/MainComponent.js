import React, {Component} from "react";
import Search from "./SearchComponent";
import {Container, Row} from "react-bootstrap";
import Upload from "./UploadComponent";

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Search />
                </Row>
                <Row>
                    <Upload />
                </Row>
            </Container>
        );
    }
}

export default Main;