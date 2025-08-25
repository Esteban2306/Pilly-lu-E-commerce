import { ReactNode, RefObject } from "react";
export type ModalWrapperProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    triggerRefs?: RefObject<HTMLElement>[];
    className?: string;
};