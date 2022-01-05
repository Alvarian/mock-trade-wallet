import Drawer from 'components/drawer';
import Button from 'components/button';
import { menuData } from 'lib/site.data.js';
import Navbar from 'components/bars/navbar';
import Searchbar from 'components/bars/searchbar';
import uuid from 'react-uuid'


export default function DrawerLayout1({ theme, children }) {  
    const drawerId = `drawer_id_${uuid()}`;

    return (
        <Drawer
            drawerId={drawerId}
            menuItems={menuItems}
            theme={theme}
            isRightSide={true}
        >
            <Navbar
                src={drawerId} 
                menuItems={menuItems}
                color="neutral"
                title="Corporate Inc."
                size="normal"  
            />            

            {children}

            <footer>
                <Searchbar
                    src={drawerId} 
                    color="neutral"
                    size="normal"  
                />
            </footer>
        </Drawer>
    );
}

const menuItems = menuData.map((item, i) => (
    <Button
        key={i}
        as="link"
        src={item.path}
        state="ghost"
        size="normal"
        color="white"
    >{item.label}</Button>
));