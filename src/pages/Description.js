import React, { useState } from 'react'

const Description = () => {
    const [coins] = useState();
    const txt1=JSON.stringify(coins?.Description);
    // const txt2=txt1.replace(/<[^>]*>/g, '');
    console.log(txt1)

    return <div dangerouslySetInnerHTML={{ __html: txt1 }} />;
}

export default Description
