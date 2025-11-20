import { useState, useEffect } from 'react';

export function useSkeletonLoader(isLoading: boolean, delay: number = 400) {
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setShowSkeleton(false), delay);
            return () => clearTimeout(timer);
        } else {
            setShowSkeleton(true);
        }
    }, [isLoading, delay]);

    return showSkeleton;
}