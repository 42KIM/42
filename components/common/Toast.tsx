import { dialogAtom } from '@/lib/use-dialog';
import type { PropsWithChildren, ReactNode } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type ToastBackgroundProps = {
  onBackgroundClick?: () => void,
};

type ToastProps = {
  title: string,
  content: ReactNode,
  onConfirm?: () => void,
  onCancel?: () => void,
  onBackgroundClick?: () => void,
};

export const ToastBaseComponent = () => {
  const dialogProps = useRecoilValue(dialogAtom);

  return (
    <div id='toast-base-component'>
      {dialogProps && <Toast {...dialogProps} />}
    </div>
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
  title,
  content,
  onConfirm,
  onCancel,
  onBackgroundClick,
}: ToastProps) => {
  const setDialog = useSetRecoilState(dialogAtom);

  const closeDialog = () => {
    setDialog(null);
  };

  return (
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
              closeDialog();
            }}>CLOSE</button>
        </div>
        <div className='px-1 my-4 text-md text-center'>{content}</div>
        <div className='self-end flex gap-3 p-1'>
          <button
            className='text-xs font-medium text-sky-500 opacity-50 hover:opacity-100'
            onClick={() => {
              onConfirm?.();
              closeDialog();
            }}>OK</button>
          {onCancel && <button
            className='text-xs font-medium text-red-500 opacity-50 hover:opacity-100'
            onClick={() => {
              onCancel();
              closeDialog();
            }}>CANCEL</button>}
        </div>
      </div>
    </ToastBackground>
  );
};

export default Toast;
