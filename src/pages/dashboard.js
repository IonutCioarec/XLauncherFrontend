import React from "react";
import Layout from 'layout/layout';

function Dashboard(props) {
    return (
        <Layout tokenList={props.tokenList} accountNFTS={props.accountNFTS}>
            <p style={{fontSize: '50px', color: 'white'}}>Dashboard</p>
        </Layout>
    );
}

export default Dashboard;