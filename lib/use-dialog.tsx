import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { dialogAtom } from '@/components/common/Dialog';
import type { DialogProps } from '@/components/common/Dialog';

export const useDialog = () => {
  const setDialog = useSetRecoilState(dialogAtom);

  const showDialog = useCallback((dialogProps: DialogProps) => {
    setDialog(dialogProps);
  }, [ setDialog ]);

  const showErrorDialog = useCallback((error: unknown, dialogProps?: DialogProps) => {
    if (!(error instanceof Error)) return;

    setDialog({
      ...dialogProps,
      type: 'error',
      title: '오류',
      content: error instanceof AxiosError ? error.response?.data?.message : error.message,
    });
  }, [ setDialog ]);

  return {
    showDialog,
    showErrorDialog,
  };
};
