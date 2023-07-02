import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export const dialogAtom = atom<DialogProps | null>({
  key: 'dialogAtom',
  default: null,
});

type DialogBackgroundProps = {
  onBackgroundClick?: () => void,
};

export type DialogProps = {
  type?: 'default' | 'error',
  title: string,
  content: ReactNode,
  onConfirm?: () => void,
  onCancel?: () => void,
  onBackgroundClick?: () => void,
};

const DialogBackground = ({ children, onBackgroundClick }: PropsWithChildren<DialogBackgroundProps>) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed w-screen h-screen z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid place-items-center"
      onClick={() => onBackgroundClick?.()}
    >
      <div className="absolute top-0 w-screen h-screen bg-neutral-500 opacity-20" />
      {children}
    </div>
  );
};

const Dialog = ({
  type = 'default',
  title,
  content,
  onConfirm,
  onCancel,
  onBackgroundClick,
}: DialogProps) => {
  const setDialog = useSetRecoilState(dialogAtom);

  const closeDialog = () => {
    setDialog(null);
  };

  const isError = type === 'error';

  return (
    <DialogBackground onBackgroundClick={onBackgroundClick} >
      <div
        className={`${isError ? 'bg-red-50 border-red-100' : 'bg-sky-50 border-sky-100'} z-50 w-80 border-2 flex flex-col gap-1 shadow-lg`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`flex justify-between p-1 text-xs ${isError ? 'bg-red-100' : 'bg-sky-100'}`}>
          <span className={isError ? 'text-red-500' : 'text-sky-500'}>{title}</span>
          <button
            className="text-neutral-500 opacity-50 hover:opacity-100"
            onClick={() => {
              onCancel ? onCancel() : onConfirm?.();
              closeDialog();
            }}
          >CLOSE
          </button>
        </div>
        <div className="px-1 my-4 text-md text-center">{content}</div>
        <div className="self-end flex gap-3 p-1">
          <button
            className={`text-xs font-medium ${isError ? 'text-red-500' : 'text-sky-500'} opacity-50 hover:opacity-100`}
            onClick={() => {
              onConfirm?.();
              closeDialog();
            }}
          >OK
          </button>
          {onCancel && <button
            className="text-xs font-medium text-red-500 opacity-50 hover:opacity-100"
            onClick={() => {
              onCancel();
              closeDialog();
            }}
          >CANCEL
          </button>}
        </div>
      </div>
    </DialogBackground>
  );
};

const DialogBase = () => {
  const dialogProps = useRecoilValue(dialogAtom);

  return (
    <div id="dialog-base-component">
      {dialogProps && <Dialog {...dialogProps} />}
    </div>
  );
};

export default DialogBase;
