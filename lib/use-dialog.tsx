import { atom, useSetRecoilState } from 'recoil';

type DialogProps = {
  title: string,
  content: React.ReactNode,
};

export const dialogAtom = atom<DialogProps | null>({
  key: 'dialogAtom',
  default: null,
});

export const useDialog = () => {
  const setDialog = useSetRecoilState(dialogAtom);

  return {
    showDialog: (dialogProps: DialogProps) => {
      setDialog(dialogProps);
    },
  };
};
