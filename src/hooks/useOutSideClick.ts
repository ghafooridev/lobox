import { useRef, useEffect } from "react";

export const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLInputElement;
            if (ref.current && !ref.current.contains(target)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return ref;
};