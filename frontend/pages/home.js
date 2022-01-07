import React, { useState, useEffect } from 'react'
import { getCookie, removeCookies } from 'cookies-next';
import { useRouter } from 'next/router';


export default function Home() {
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();

    useEffect(async () => {
        const userID = getCookie('user_id');
        
        try {
            if (!userID) throw "Unauthorized";

            const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API_URL}/assets?user_id=${userID}`, {
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
                    const data = await response.json();
                    if (!data.ok) throw data.statusText;
                }

                if (err === 'Forbidden') throw err;

                setLoaded(true);
            } catch (err) {
                removeCookies("user_id");

                router.push({
                    pathname: '/login'
                });
            }
        }
    });

    if (!loaded) {
        return (<p></p>)
    }

    return (
        <h1>Home</h1>
    )
}