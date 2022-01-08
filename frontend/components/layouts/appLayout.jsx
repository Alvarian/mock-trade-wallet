import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/button';
import { appMenuData } from 'lib/site.data.js';
import Navbar from 'components/bars/navbar';
import Searchbar from 'components/bars/searchbar';
// import uuid from 'react-uuid'


export default function AppLayout({ 
    theme, 
    children, 
    page
}) {  
    // const drawerId = `drawer_id_${uuid()}`;

    const [loaded, setLoaded] = useState(false);
    const router = useRouter();

    useEffect(async () => {        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API_URL}/${page}`, {
                method: "GET",
                credentials: "include"
            });
            if (!response.ok) throw response.statusText;
            const data = await response.json();
            if (!data.ok) throw data.statusText;

            setLoaded(true);
        } catch (err) {
            try {
                if (err === 'Unauthorized') {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/refresh_token`, {
                        method: "GET",
                        credentials: "include"
                    });
                    if (!response.ok) throw response.statusText;
                    const data = await response;
                    if (!data.ok) throw data.statusText;
                }

                if (err === 'Forbidden') throw err;

                setLoaded(true);
            } catch (err) {
                console.log(err)
                handleLogout();
            }
        }
    });

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/logout`, {
                method: "DELETE",
                credentials: "include",
            });
            
            if (!response.ok) throw response.statusText;

            router.push({
                pathname: '/'
            });
        } catch (err) {
            console.log(err)
        }
    };

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
                endExtraButton={
                    <Button
                        callBack={handleLogout}
                        state="ghost"
                        size="normal"
                        color="white"
                    >Logout</Button>
                }
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

const menuItems = appMenuData.map((item, i) => (
    <Button
        key={i}
        as="link"
        src={item.path}
        state="ghost"
        size="normal"
        color="white"
    >{item.label}</Button>
));