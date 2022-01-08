export default function Image({
    shape="square",
    size="full",
    src,
    alt,
    styles=null
}) {
    const classes = {
        main: `
            ${classNameShapes[shape]} 
            ${classNameSizes[size]}
            ${styles?.main}
        `.replace(/\s+/g, ' ').trim(), 
        image: `
            ${classNameShapes[shape]} 
            ${classNameSizes[size]}
            ${styles?.image}
        `.replace(/\s+/g, ' ').trim()
    };

    return (
        <div className={classes.main}>
            <img src={src} alt={alt} className={classes.image} />
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