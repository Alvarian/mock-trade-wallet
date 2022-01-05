import Button from 'components/button'
import buttonThemes from 'lib/icons/button'


export default function Navbar({
    src,
    menuItems,
    color,
    title,
    size
}) {
    const guardSize = size === "large" ? "normal" : (size === "tiny" ? "small" : (size === "small" ? "small" : "normal"));

    const stacked = buttonThemes({
        type: "stacked",
        state: "accent",
        size: guardSize,
        color: "white"
    });
    
    return (
        <div className={`navbar mb-2 shadow-lg ${classNameColors[color]} ${classNameBarHeights[guardSize]} text-neutral-content `}>
            <div className="flex-1 px-2 mx-2">
                <span className={`${classNameFontSizes[guardSize]} font-bold`}>
                    {title}
                </span>
            </div> 

            <div className="flex-none hidden px-2 mx-2 md:flex">
                <div className="flex items-stretch">
                    {menuItems}
                </div>
            </div>

            <div className="flex-none">
                <Button
                    as="label"
                    src={src}
                    state={stacked.state}
                    shape={stacked.shape}
                    size={stacked.size}
                    color={stacked.color}
                    styles="drawer-button md:hidden"
                >
                    {stacked.content}
                </Button>
            </div> 
        </div>
    );
}

const classNameFontSizes = {
    large: "text-xl",
    normal: "text-lg",
    small: "text-base",
    tiny: "text-sm"
};

const classNameBarHeights = {
    normal: "min-h-16",
    small: "min-h-12"
};

const classNameColors = {
    neutral: "bg-neutral",
    primary: "bg-blue-500"
};