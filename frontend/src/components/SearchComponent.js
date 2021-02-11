import React, {Component} from "react";
import {Form, Row, Col, Container} from 'react-bootstrap';
import {fetchSuggestions} from "../shared/restApis";

function RenderSuggestions({suggestions}) {
    if (suggestions != null && suggestions.length > 0) {
        return (
            <ul>
                {suggestions.map((suggestion) => {
                    return (
                        <li key={suggestion.toString()}>{suggestion}</li>
                    );
                })}
            </ul>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

class Search extends Component {
    constructor() {
        super();
        this.termInput = React.createRef();
    }

    state = {
        suggestions: [],
    }

    handleInputChange = (value) => {
        let result = fetchSuggestions(value);
        result.then(data => this.setState({
            suggestions: data.topten
        }));
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <h3>Typeahead System</h3>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h3>MyZoe Search</h3>
                    </Col>
                    <Col md={9}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Search for...</Form.Label>
                                <Form.Control
                                    ref={this.termInput}
                                    type="text"
                                    onChange={(event) => this.handleInputChange(event.target.value)} />
                            </Form.Group>
                            <RenderSuggestions suggestions={this.state.suggestions}/>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Search;