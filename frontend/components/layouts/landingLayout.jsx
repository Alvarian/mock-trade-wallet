import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/button';
import { landingMenuData } from 'lib/site.data.js';
import Navbar from 'components/bars/navbar';
import Searchbar from 'components/bars/searchbar';
// import uuid from 'react-uuid'


export default function landingLayout({ 
    theme, 
    children,
    cookies
}) {  
    // const drawerId = `drawer_id_${uuid()}`;

    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const userID = cookies?.user_id;

    useEffect(async () => {        
        if (userID) {
            router.push({
                pathname: '/home'
            });    
        } else {
            setLoaded(true);
        }
    });

    if (!loaded) {
        return (<p></p>)
    }

    return (
        <div>
            <Navbar
                // src={drawerId} 
                menuItems={menuItems}
                color="neutral"
                title="Corporate Inc."
                size="normal"  
            />            

            {children}

            <footer>
                <Searchbar
                    // src={drawerId} 
                    color="neutral"
                    size="normal"  
                />
            </footer>
        </div>
    );
}

const menuItems = landingMenuData.map((item, i) => (
    <Button
        key={i}
        as="link"
        src={item.path}
        state="ghost"
        size="normal"
        color="white"
    >{item.label}</Button>
));