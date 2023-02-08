import React from "react";
import Layout from 'layout/layout';

function Team(props) {
    return (
        <Layout tokenList={props.tokenList} accountNFTS={props.accountNFTS}>
            <p style={{fontSize: '50px', color: 'white'}}>Team</p>
        </Layout>
    );
}

export default Team;