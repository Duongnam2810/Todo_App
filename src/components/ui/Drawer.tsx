import React from 'react';
import { TfiClose } from 'react-icons/tfi';

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
  return (
    <>
      <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-header">
          <button className="todo-button" onClick={onClose}>
            <TfiClose></TfiClose>
          </button>
        </div>
        <div className="drawer-content">{children}</div>
      </aside>
    </>
  );
};

export default Drawer;