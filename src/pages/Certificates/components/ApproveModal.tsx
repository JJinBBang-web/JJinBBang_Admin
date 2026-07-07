import { Button, Modal } from 'antd';
import { modalActionButtonClassName } from '../styles';

type ApproveModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLoading?: boolean;
};

const ApproveModal = ({ open, onCancel, onConfirm, confirmLoading }: ApproveModalProps) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={null} width={460} closable={false}>
      <div className="flex flex-col gap-1.5">
        <h3 className="mb-0! text-[17px] font-bold text-text-primary">합격증 승인</h3>
        <p className="text-[13px] text-text-muted">
          승인하시겠어요? 승인 시 유저에게 알림톡·SMS가 자동 발송됩니다.
        </p>
      </div>

      <div className="mt-3.5 flex justify-end gap-2">
        <Button onClick={onCancel} className={modalActionButtonClassName}>
          취소
        </Button>
        <Button
          type="primary"
          loading={confirmLoading}
          onClick={onConfirm}
          className="!h-auto !rounded-sm !px-[15px] !py-[9px] !text-[13px] !font-semibold !shadow-none"
        >
          승인
        </Button>
      </div>
    </Modal>
  );
};

export default ApproveModal;
