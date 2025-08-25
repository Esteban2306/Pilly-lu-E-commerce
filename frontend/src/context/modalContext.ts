import React from "react";

interface modalContextType {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    activeModal: string | null;
    setActiveModal: React.Dispatch<React.SetStateAction<string | null>>;
}

const modalContext = React.createContext<modalContextType | undefined>(undefined);

export default modalContext;