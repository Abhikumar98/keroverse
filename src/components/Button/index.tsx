import React, { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    readonly fullWidth?: boolean;
    readonly loading?: boolean;
    readonly publicButton?: boolean;
    readonly size?: "sm" | "lg";
    readonly variant?: "primary" | "secondary" | "ghost" | "danger" | "white";
    readonly align?: "start" | "center" | "end";
}

const Button: React.FC<IButton> = ({
    children,
    disabled,
    loading,
    size = "sm",
    fullWidth,
    variant = "primary",
    align = "center",
    publicButton,
    ...props
}) => {
    const selectedSize = {
        sm: " px-5 py-2 sm:text-base text-sm ",
        lg: " px-6 py-3 sm:text-lg text-base ",
    };

    const disabledButton = disabled || loading;

    const selectedVariant = {
        primary: `${
            publicButton
                ? " bg-publicButtonBackground text-publicButtonText "
                : "button-gradient text-white"
        } ${disabledButton ? "" : "hover:opacity-80"}`,
        danger: `bg-red-400 text-white ${
            disabledButton ? "" : "hover:opacity-80"
        }`,
        secondary: `
		${
            disabledButton ? "" : "hover:opacity-80"
        } bg-secondaryButtonBackground border-gray-500 text-primaryText `,
        ghost: `${
            disabledButton ? "" : " hover:bg-secondaryButtonBackground"
        } text-primaryText`,
        white: `text-black bg-white`,
    };

    return (
        <button
            type="button"
            disabled={disabled || loading}
            {...props}
            className={` font-satoshi ${
                disabled ? "opacity-30 pointer-events-none" : ""
            } border-none ${
                selectedVariant[variant]
            } opacity-100 transition-all ease-in-out relative flex justify-${align} items-center ${
                selectedSize[size]
            } text-base font-medium rounded-md shadow-sm ${
                fullWidth ? "w-full" : ""
            } `}
        >
            <div
                className={`${
                    loading
                        ? "visible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        : "hidden"
                }`}
            >
                <svg
                    className={`animate-spin ${
                        size === "sm" ? "h-5 w-5" : "h-7 w-7"
                    } text-primaryText`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            </div>
            <div
                className={`flex items-center justify-${align} w-full ${
                    loading ? "invisible" : "  "
                }`}
            >
                {children}
            </div>
        </button>
    );
};

export default Button;
