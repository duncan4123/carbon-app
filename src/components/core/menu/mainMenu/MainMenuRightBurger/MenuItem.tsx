import { FC, ReactElement } from 'react';
import { ReactComponent as IconArrow } from 'assets/icons/arrow-cut.svg';
import { Item } from '.';

type MenuItemProps = {
  onClick: () => void;
  content: string | ReactElement;
  children?: Item[];
};

export const MenuItem: FC<MenuItemProps> = ({ onClick, content, children }) => {
  return (
    <div
      onClick={onClick}
      className={
        'hover:bg-body block cursor-pointer rounded-6 p-10 hover:text-white'
      }
    >
      <div className={`${children ? 'flex items-center justify-between' : ''}`}>
        <span>{content}</span>
        {children && <IconArrow className="h-12 w-7" />}
      </div>
    </div>
  );
};
