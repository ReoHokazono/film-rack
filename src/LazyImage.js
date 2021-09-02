import React, { useEffect, useState } from "react";

export default function LazyImage(props) {
    const [loaded, setLoaded] = useState(false);
    
    useEffect(()=> {
        const image = new Image();
        image.src = props.src
        image.onload = () => {
            setLoaded(true);
        };
    });

    if (loaded) {
        return (<img className={props.className} src={props.src} alt={props.alt} />);
    } else {
        return (<div className={props.className} ></div>);
    }
}