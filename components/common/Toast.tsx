import type { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

const TOAST_BASE_ID = 'toast-base-component';

type ToastBackgroundProps = {
  onBackgroundClick?: () => void,
};

type ToastProps = {
  showState: [ boolean, Dispatch<SetStateAction<boolean>> ],
  title: string,
  content: ReactNode,
  onConfirm?: () => void,
  onCancel?: () => void,
  onBackgroundClick?: () => void,
};

export const ToastBaseComponent = () => {
  return (
    <div id={TOAST_BASE_ID} />
  );
};

const ToastBackground = ({ children, onBackgroundClick }: PropsWithChildren<ToastBackgroundProps>) => {
  return (
    <div
      id='bg'
      className='absolute z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen grid place-items-center'
      onClick={() => onBackgroundClick?.()}
    >{children}</div>
  );
};

const Toast = ({
  showState,
  title,
  content,
  onConfirm,
  onCancel,
  onBackgroundClick,
}: ToastProps) => {
  const [ show, setShow ] = showState;
  if (typeof window === 'undefined') return null;

  const baseComponent = document.getElementById(TOAST_BASE_ID);

  if (baseComponent === null) return null;

  return show ? createPortal(
    <ToastBackground onBackgroundClick={onBackgroundClick} >
      <div className='bg-sky-50 z-50 w-1/3 border-2 border-blue-100 flex flex-col gap-1'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className='flex justify-between p-1 text-xs bg-blue-100'>
          <span className='text-sky-500'>{title}</span>
          <button
            className='text-neutral-500 opacity-50 hover:opacity-100'
            onClick={() => {
              onCancel ? onCancel() : onConfirm?.();
              setShow(false);
            }}>CLOSE</button>
        </div>
        <div className='px-1 my-4 text-md text-center'>{content}</div>
        <div className='self-end flex gap-3 p-1'>
          <button
            className='text-xs font-medium text-sky-500 opacity-50 hover:opacity-100'
            onClick={() => {
              onConfirm?.();
              setShow(false);
            }}>OK</button>
          {onCancel && <button
            className='text-xs font-medium text-red-500 opacity-50 hover:opacity-100'
            onClick={() => {
              onCancel();
              setShow(false);
            }}>CANCEL</button>}
        </div>
      </div>
    </ToastBackground>,
    baseComponent
  ) : null;
};

export default Toast;
