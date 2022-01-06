import { GiHamburgerMenu } from 'react-icons/gi';
import { BsThreeDots, BsSearch, BsHeart, BsBell } from 'react-icons/bs';
import { MdClose, MdArrowBack, MdArrowForward } from 'react-icons/md';


export default ({type, content, state, size, shape, color}) => {
    const iconSizeMap = {
        large: 44,
        normal: 30,
        small: 20
    };
    // Font awesome pixel sizes relative to the multiplier. 
    // 1x - 14px
    // 2x - 28px
    // 3x - 42px
    // 4x - 56px
    // 5x - 70px
    
    const themes = {
        button: {
            content,
            state,
            size,
            shape,
            color
        },
        stacked: {
            content: (
                <GiHamburgerMenu size={iconSizeMap[size]} />
            ),
            state: state || "ghost",
            size,
            shape: "square",
            color
        },
        dots: {
            content: (
                <BsThreeDots size={iconSizeMap[size]} />
            ),
            state: state || "ghost",
            size,
            shape: "square",
            color
        },
        search: {
            content: (
                <BsSearch size={iconSizeMap[size]} />
            ),
            state: state || "ghost",
            size,
            shape: "square",
            color
        },
        heart: {
            content: (
                <BsHeart color={color || "pink"} size={iconSizeMap[size]} />
            ),
            state: state || "ghost",
            size,
            shape: "square",
            color
        },
        bell: {
            content: (
                <BsBell color={color || "yellow"} size={iconSizeMap[size]} />
            ),
            state: state || "ghost",
            size,
            shape: "square",
            color
        },
        cancel: {
            content: (
                <MdClose color={color || "red"} size={iconSizeMap[size]} />
            ),
            state: state || "ghost",
            size,
            shape: "square",
            color
        },
        back: {
            content: (
                <MdArrowBack color={color || "purple"} size={iconSizeMap[size]} />
            ),
            state: state || "ghost",
            size,
            shape: "square",
            color
        },
        forward: {
            content: (
                <MdArrowForward color={color || "purple"} size={iconSizeMap[size]} />
            ),
            state: state || "ghost",
            size,
            shape: "square",
            color
        }
    };

    return themes[type];
};