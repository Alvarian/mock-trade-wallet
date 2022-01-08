export default function Button({
    as="",
    size="normal",
    state="primary",
    shape="normal",
    color="black",
    isActive=false,
    isOutlined=false,
    isDisabled=false,
    isLoading=false,
    callBack=null,
    styles="",
    src="",
    children
}) {
    const classes = `
        btn mx-1 rounded-btn 
        ${classNameSizes[size]}
        ${classNameStates[state]} 
        ${classNameShapes[shape]} 
        ${isActive ? "btn-active" : ""} 
        ${isOutlined ? "btn-outline" : ""} 
        ${isDisabled ? "btn-diabled" : ""}
        ${isLoading ? "loading" : ""}
        ${styles}
        ${classNameFontColors[color]}
    `.replace(/\s+/g, ' ').trim();

    if (as === "label") {
        return <label htmlFor={src} className={classes}>{children}</label>
    } else if (as === "link") {
        return <a onClick={callBack} href={src} className={classes}>{children}</a>
    } else if (as === "submit") {
        return <button type="submit" onClick={callBack} className={classes}>{children}</button>  
    } else {
        return <button onClick={callBack} className={classes}>{children}</button>  
    }
}
           
const classNameSizes = {
    large: "btn-lg",
    small: "btn-sm",
    normal: "",
    tiny: "btn-xs"
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

const classNameShapes = {
    circle: "btn-circle",
    square: "btn-square",
    rect: "btn-wide",
    normal: ""
};
