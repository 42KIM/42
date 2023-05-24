import type { DialogProps } from '@/components/common/Dialog';
import { dialogAtom } from '@/components/common/Dialog';
import { useSetRecoilState } from 'recoil';

export const useDialog = () => {
  const setDialog = useSetRecoilState(dialogAtom);

  return {
    showDialog: (dialogProps: DialogProps) => {
      setDialog(dialogProps);
    },
  };
};
