import Button from 'components/button';
import Image from 'components/image';
import buttonThemes from 'lib/icons/button';


export default function Navbar({
    src,
    color,
    size
}) {
    const guardSize = size === "large" ? "normal" : (size === "tiny" ? "small" : (size === "small" ? "small" : "normal"));

    const search = buttonThemes({
        type: "search",
        state: "primary",
        size: guardSize,
        color: "white"
    });

    const bell = buttonThemes({
        type: "bell",
        size: guardSize,
        color: "white",
        state: "secondary"
    });
    
    return (
        <div className={`navbar my-2 mx-1 shadow-lg ${classNameColors[color]} ${classNameBarHeights[guardSize]} bg-neutral text-neutral-content rounded-box`}>
            <div className="flex-1 hidden px-2 mx-2 lg:flex">
                <span className="text-lg font-bold">
                    daisyUI
                </span>
            </div> 

            <div className={`${classNameBarHeights[guardSize]} flex-1 lg:flex-none`}>
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-ghost" />
                </div>
            </div> 

            <div className="flex-none">
                <Button
                    as="label"
                    src={src}
                    state={search.state}
                    shape={search.shape}
                    size={search.size}
                    color={search.color}
                    styles="drawer-button"
                >
                    {search.content}
                </Button>
            </div> 

            <div className="flex-none">
                <Button
                    as="label"
                    src={src}
                    state={bell.state}
                    shape={bell.shape}
                    size={bell.size}
                    color={bell.color}
                    styles="drawer-button"
                >
                    {bell.content}
                </Button>
            </div> 

            <div className="flex-none">
                <div className="avatar">
                    <Image 
                        src="https://i.pravatar.cc/500?img=32"
                        alt="profile icon"
                        size={guardSize}
                        shape="circle"
                    />
                </div>
            </div>
        </div>        
    );
}

const classNameBarHeights = {
    large: "min-h-24",
    normal: "min-h-16",
    small: "min-h-12",
    tiny: "min-h-8"
};

const classNameColors = {
    neutral: "bg-neutral",
    primary: "bg-blue-500"
};
