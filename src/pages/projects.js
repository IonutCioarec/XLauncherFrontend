import React from "react";
import Layout from 'layout/layout';

function Projects(props) {
    return (
        <Layout tokenList={props.tokenList} accountNFTS={props.accountNFTS}>
            <p style={{fontSize: '50px', color: 'white'}}>Projects</p>
        </Layout>
    );
}

export default Projects;