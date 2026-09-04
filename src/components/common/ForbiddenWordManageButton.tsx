import { useState } from 'react';
import { Button } from 'antd';
import { ForbiddenWordModal } from './ForbiddenWordModal';

export const ForbiddenWordManageButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="h-9! rounded-sm! border-border! px-3.5! text-[13px]! font-semibold! text-text-primary! shadow-none!"
      >
        금칙어 사전 관리
      </Button>
      <ForbiddenWordModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ForbiddenWordManageButton;
