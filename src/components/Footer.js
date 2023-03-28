import React from 'react'
import { Card, Container, Header, Segment, Grid, List, Divider, Image } from 'semantic-ui-react'

const Footer = () => {
    return (
        <Segment inverted vertical style={{ padding: '2em 0 2em 0' }}>
            <Container textAlign='center'>
                <Grid divided inverted  stackable  columns='equal'>
                    <Grid.Column >
                        <Header inverted as='h4' content='About the Developers' />
                        <List link inverted>
                            <List.Item as='a' href="https://github.com/DirtyKeyboard">Andrew Hawileh</List.Item>
                            <List.Item as='a' href="hhttps://github.com/jordandc20">Diana Jordan</List.Item>
                            <List.Item as='a' href="https://github.com/joshuathawke">Joshua Hawke</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column >
                        <Header inverted as='h4' content='Resources' />
                        <List link inverted>
                            <List.Item as='a' href="https://react.semantic-ui.com/">Semantic UI React</List.Item>
                            <List.Item as='a' href="https://www.themealdb.com">TheMealDB API</List.Item>
                        </List>
                    </Grid.Column>
                </Grid>
            </Container>
        </Segment>
    )
}

export default Footer