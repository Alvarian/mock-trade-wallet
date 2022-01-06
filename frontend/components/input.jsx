export default function Input({
    as="text",
    name="",
    label,
    value=null,
    size="normal",
    state="primary",
    color="black",
    isBordered=false,
    isActive=false,
    isOutlined=false,
    isDisabled=false,
    isLoading=false,
    styles="",
    callBack=null,
    index=null
}) {
    const classes = `
        ${as} mx-1 
        ${as}-${classNameSizes[size]}
        ${as}-${classNameStates[state]} 
        ${isBordered ? as+"-bordered" : ""}
        ${isActive ? as+"-active" : ""} 
        ${isOutlined ? as+"-outline" : ""} 
        ${isDisabled ? as+"-diabled" : ""}
        ${isLoading ? "loading" : ""}
        ${styles}
        ${classNameFontColors[color]}
    `.replace(/\s+/g, ' ').trim();
    
    
    if (as === "text") {
        return (
            <div className="form-control">
                <label className="label">
                    <span className="label-text">{label}</span>
                </label> 
                <input onChange={callBack.bind(this, index)} type="text" placeholder={name} name={name} className={classes} value={value} />
            </div>
        )
    }
    if (as === "radio") {
        return (
            <div className="form-control">
                <label className="cursor-pointer label">
                    <span className="label-text">{label}</span> 
                    <input onChange={callBack.bind(this, index)} checked={value} type="checkbox" placeholder={name} name={name} className={classes} value={value} />
                </label>
            </div> 
        )
    }
    if (as === "toggle") {
        return (
            <div className="form-control">
                <label className="cursor-pointer label">
                    <span className="label-text">{label}</span> 
                    <input onChange={callBack.bind(this, index)} checked={value} type="checkbox" placeholder={name} name={name} className={classes} value={value} />
                </label>
            </div>
        )
    }
    if (as === "textarea") {
        return (
            <div className="form-control">
                <label className="label">
                    <span className="label-text">{label}</span>
                </label> 
                <textarea onChange={callBack.bind(this, index)} className={`h24 ${classes}`} name={name} placeholder={name} value={value}></textarea>
            </div>
        )
    }
    if (as === "select") {
        return (
            <select className={`${classes} w-full max-w-xs`}>
                <option disabled="disabled" selected="selected">Choose your superpower</option> 
                <option>telekinesis</option> 
                <option>time travel</option> 
                <option>invisibility</option>
            </select>
        )
    }
    if (as === "range") {
        return (
            <div className="form-control">
                <label className="cursor-pointer label">
                    <span className="label-text">{label}</span> 
                    <input onChange={callBack.bind(this, index)} type="range" max="100" value={value} className={classes} name={name} /> 
                </label>
            </div>
        )
    }
    if (as === "check") {
        return (
            <div className="form-control">
                <label className="cursor-pointer label">
                    <span class="label-text">{label}</span> 
                    <input onChange={callBack.bind(this, index)} type="checkbox" checked="checked" class={classes} name={name} value={value} />
                </label>
            </div>
        )
    }
}

const classNameSizes = {
    large: "lg",
    small: "sm",
    normal: "",
    tiny: "xs"
};

const classNameStates = {
    primary: "primary",
    secondary: "secondary",
    accent: "accent",
    ghost: "ghost",
    link: "link",
    info: "info",
    success: "success",
    warning: "warning",
    error: "error",
    disabled: "disabled",
    glass: "glass",
    block: "block"
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