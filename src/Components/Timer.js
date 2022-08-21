import React, { useEffect, useState } from 'react';

export default function Timer({mytimer}){
    const [refresh, setRefresh] = useState(true);

    useEffect(()=>{
        const myInt = setInterval(()=>{
            setRefresh(!refresh);
        }, 1000)

        return clearInterval(myInt);
    }, [refresh])

    return (
        <p>
         Timer: {mytimer}
         </p> 
           
    );
};
