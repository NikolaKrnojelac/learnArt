import {useState, useEffect} from "react";

export function useDebouncedValue<T>(value: T, delay = 300){
    const [debounce, setDebounce] = useState(value);


    useEffect(() => {
        const timer = setTimeout(() => setDebounce(value), delay);
        return () => clearTimeout(timer)
    }, [value, delay]);

    return debounce;
}