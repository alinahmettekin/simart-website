"use client";
import Link from "next/link";

/**
 * Reusable button component
 * @param {Object} props
 * @param {string} props.href - Link URL (if provided, renders as Link)
 * @param {Function} props.onClick - Click handler (if provided, renders as button)
 * @param {string} props.text - Button text
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Button size: 'sm', 'md', 'lg' (default: '')
 * @param {boolean} props.fullWidth - Full width button (default: false)
 * @param {string} props.variant - Button variant: 'primary', 'outline' (default: 'primary')
 * @param {string} props.modalTarget - Modal target (e.g., '#quick_add') for onClick buttons
 * @param {boolean} props.disabled - Disabled state (default: false)
 * @param {Object} props.style - Inline styles
 */
export default function Button({
    href,
    onClick,
    text,
    className = "",
    size = "",
    fullWidth = false,
    variant = "primary",
    modalTarget = null,
    disabled = false,
    style = {},
}) {
    const baseClasses = "tf-btn btn-primary-main style-3 fw-6 btn-light-icon animate-hover-btn";
    const sizeClass = size ? `btn-${size}` : "";
    const widthClass = fullWidth ? "w-100" : "";
    const variantClass = variant === "outline" ? "btn-outline" : "";
    const roundedClass = "rounded-full";
    
    const allClasses = `${baseClasses} ${sizeClass} ${widthClass} ${variantClass} ${roundedClass} ${className}`.trim();

    const buttonStyle = (
        <style jsx global>{`
            .tf-btn.btn-primary-main span {
                color: #fff !important;
            }
        `}</style>
    );

    if (href) {
        return (
            <>
                <Link href={href} className={allClasses}>
                    <span>{text}</span>
                </Link>
                {buttonStyle}
            </>
        );
    }

    if (onClick) {
        return (
            <>
                <a
                    href={modalTarget || "#"}
                    onClick={(e) => {
                        if (disabled) {
                            e.preventDefault();
                            return;
                        }
                        if (modalTarget) {
                            // Modal açma işlemi Bootstrap tarafından yapılacak
                            // onClick fonksiyonunu da çağır
                            onClick();
                        } else {
                            e.preventDefault();
                            onClick();
                        }
                    }}
                    data-bs-toggle={modalTarget ? "modal" : undefined}
                    className={allClasses}
                    style={{
                        ...style,
                        ...(disabled ? { opacity: 0.6, cursor: "not-allowed", pointerEvents: "none" } : {}),
                    }}
                >
                    <span>{text}</span>
                </a>
                {buttonStyle}
            </>
        );
    }

    return (
        <>
            <button 
                className={allClasses}
                disabled={disabled}
                style={style}
            >
                <span>{text}</span>
            </button>
            {buttonStyle}
        </>
    );
}

