import React from "react";
import Layout from 'layout/layout';

function Staking(props) {
    return (
        <Layout tokenList={props.tokenList} accountNFTS={props.accountNFTS}>
            <p style={{fontSize: '50px', color: 'white'}}>Staking</p>
        </Layout>
    );
}

export default Staking;