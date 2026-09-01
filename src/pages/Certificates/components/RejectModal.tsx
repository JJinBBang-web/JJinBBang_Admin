import { useState } from 'react';
import { Button, Input, Modal, Radio } from 'antd';
import type { RejectReasonCategory } from '../../../types';
import { REJECT_REASON_OPTIONS } from '../constants';
import { modalActionButtonClassName } from '../styles';

interface RejectModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
  confirmLoading?: boolean;
};

export const RejectModal = ({ open, onCancel, onConfirm, confirmLoading }: RejectModalProps) => {
  const [selectedReason, setSelectedReason] = useState<RejectReasonCategory | null>(null);
  const [customReason, setCustomReason] = useState('');

  const reset = () => {
    setSelectedReason(null);
    setCustomReason('');
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const handleConfirm = () => {
    if (!selectedReason) return;
    const reason = customReason.trim()
      ? `${selectedReason} - ${customReason.trim()}`
      : selectedReason;
    onConfirm(reason);
    reset();
  };

  return (
    <Modal open={open} onCancel={handleCancel} footer={null} width={460} closable={false}>
      <div className="flex flex-col gap-1.5">
        <h3 className="mb-0! text-[17px] font-bold text-text-primary">합격증 반려</h3>
        <p className="text-[13px] text-text-muted">
          반려 사유를 선택하면 유저에게 안내가 발송됩니다.
        </p>
      </div>

      <Radio.Group
        value={selectedReason}
        onChange={(e) => setSelectedReason(e.target.value)}
        className="mt-4 flex! w-full! flex-col! gap-2.5!"
      >
        {REJECT_REASON_OPTIONS.map((reason) => (
          <label
            key={reason}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-sm border border-border px-3.5 py-2.5 text-sm text-text-primary"
          >
            <Radio value={reason} />
            {reason}
          </label>
        ))}
      </Radio.Group>

      <div className="mt-4 flex flex-col gap-1.5">
        <label className="text-[12.5px] font-semibold text-text-secondary">직접 입력 (선택)</label>
        <Input.TextArea
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
          placeholder="반려 사유를 적어주세요."
          rows={3}
          className="rounded-sm! border-border! text-[13px]! shadow-none!"
        />
        <span className="text-xs text-text-muted">
          반려 사유는 알림톡·SMS에 포함되어 발송됩니다.
        </span>
      </div>

      <div className="mt-3.5 flex justify-end gap-2">
        <Button onClick={handleCancel} className={modalActionButtonClassName}>
          취소
        </Button>
        <Button
          disabled={!selectedReason}
          loading={confirmLoading}
          onClick={handleConfirm}
          className={modalActionButtonClassName}
        >
          반려 확정
        </Button>
      </div>
    </Modal>
  );
};