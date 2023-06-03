import type { DialogProps } from '@/components/common/Dialog';
import { dialogAtom } from '@/components/common/Dialog';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

export const useErrorDialog = () => {
  const setDialog = useSetRecoilState(dialogAtom);

  return {
    showErrorDialog: (error: unknown, dialogProps?: DialogProps) => {
      if (!(error instanceof Error)) return;

      setDialog({
        ...dialogProps,
        type: 'error',
        title: '오류',
        content: error instanceof AxiosError ? error.response?.data?.message : error.message,
      });
    },
  };
};
