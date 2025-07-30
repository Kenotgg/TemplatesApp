import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = document.getElementById('modal-root');
        if (root) {
            setModalRoot(root);
        } else {
            const newRoot = document.createElement('div');
            newRoot.id = 'modal-root';
            document.body.appendChild(newRoot);
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };


        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };

    }, [isOpen, onClose]);

    if (!isOpen || !modalRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        <Box className={styles.modalOverlay}>
            <Box className={styles.modalContent} ref={modalRef}>
                    <Button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </Button>
                    <Box>
                        {children}
                    </Box>
            </Box>
        </Box>,
        modalRoot
    );
};

export default Modal;