import Button from 'components/button';
import Image from 'components/image';


export default function Card({
    state,
    color,
    shape,
    src,
    size="full",
    title,
    description,
    isOverlay=false,
    link=null
}) {
    const classes = {
        main: `
            card
            ${classNameStates[state]}
            ${classNameSizes[size]}
            ${isOverlay && "image-full shadow-xl"}
            text-neutral-content
        `.replace(/\s+/g, ' ').trim(),
        body: `
            ${isOverlay ? "justify-end" : "max-w-md"} card-body
        `.replace(/\s+/g, ' ').trim()
    };

    return (
        <div className={classes.main}>
            <figure className={isOverlay ? "" : "p-6"}>
                <Image 
                    size={size}
                    src={src}
                />
            </figure> 

            <div className={classes.body}>
                <h2 className="card-title">{title}</h2> 

                <p>{description}</p> 

                {link && (
                    <div className="card-actions">
                        <Button 
                            as="link"
                            src={link.path}
                            state={state}
                            styles="rounded-full"
                        >{link.label}</Button>
                    </div>
                )}
            </div>
        </div>
    );
}

const classNameShapes = {
    square: "rounded-md",
    tablet: "rounded-lg",
    circle: "rounded-full"
};

const classNameSizes = {
    full: "w-full",
    large: "w-16 h-16",
    normal: "w-14 h-14",
    small: "w-10 h-10",
    tiny: "w-6 h-6"
};

const classNameStates = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    ghost: "btn-ghost",
    link: "btn-link",
    info: "btn-info",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
    disabled: "btn-disabled",
    glass: "glass",
    block: "btn-block"
};

const classNameFontColors = {
    black: "text-black",
    red: "text-red-400",
    orange: "text-yellow-600",
    yellow: "text-yellow-300",
    green: "text-green-400",
    blue: "text-blue-500",
    violet: "text-purple-400",
    white: "text-white"
};
