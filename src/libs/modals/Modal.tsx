import { FC, ReactNode } from 'react';
import { useModal } from 'hooks/useModal';
import { m, Variants } from 'libs/motion';
import { ReactComponent as IconX } from 'assets/icons/X.svg';

type Props = {
  children: ReactNode;
  id: string;
  title?: string | ReactNode;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

const getSize = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'lg':
      return 'sm:max-w-[580px]';
    case 'md':
      return 'sm:max-w-[480px]';
    default:
      return 'sm:max-w-[380px]';
  }
};

export const Modal: FC<Props> = ({
  children,
  id,
  title,
  size = 'sm',
  showCloseButton = true,
}) => {
  const { closeModal } = useModal();

  const sizeClass = getSize(size);

  return (
    <m.div
      onClick={() => closeModal(id)}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`fixed inset-0 z-40 flex items-end justify-center overflow-hidden bg-primary-500/20 outline-none backdrop-blur focus:outline-none sm:items-center sm:px-10 md:px-20`}
    >
      <m.div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${sizeClass}`}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="relative flex w-full flex-col rounded-t-30 border-0 bg-emphasis p-20 outline-none focus:outline-none sm:rounded-10">
          <div className={'flex justify-between'}>
            <div>
              {typeof title === 'string' ? (
                <h2 className={'m-0'}>{title}</h2>
              ) : (
                title
              )}
            </div>
            <div>
              {showCloseButton ? (
                <button className={'p-4'} onClick={() => closeModal(id)}>
                  <IconX className={'w-12'} />
                </button>
              ) : null}
            </div>
          </div>

          <div className="max-h-[70vh] overflow-y-auto">{children}</div>
        </div>
      </m.div>
    </m.div>
  );
};

const dropIn: Variants = {
  hidden: {
    y: '100vh',
    //opacity: 0,
    scale: 0.7,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0,
      duration: 0.5,
      type: 'spring',
      damping: 20,
      mass: 1,
      stiffness: 200,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    scale: 0.7,
    transition: {
      duration: 0.5,
    },
  },
};

const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.7,
    },
  },
};
