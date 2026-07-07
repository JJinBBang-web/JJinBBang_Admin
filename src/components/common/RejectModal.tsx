import { useState } from 'react';
import { Button, Modal } from 'antd';

const PRESET_REASONS = ['중복 신고', '위반 없음', '기타'] as const;
type PresetReason = (typeof PRESET_REASONS)[number];

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string, note: string) => void;
}

const RejectModal = ({ open, onClose, onConfirm }: Props) => {
  const [selected, setSelected] = useState<PresetReason | ''>('');
  const [note, setNote] = useState('');

  const hasReason = selected !== '' || note.trim() !== '';

  const handleClose = () => {
    setSelected('');
    setNote('');
    onClose();
  };

  const handleConfirm = () => {
    if (!hasReason) return;
    onConfirm(selected, note);
    setSelected('');
    setNote('');
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={460}
      transitionName=""
      maskTransitionName=""
      title={
        <div className="pb-1">
          <p className="text-[17px] font-bold text-text-primary leading-tight">신고 기각</p>
          <p className="text-[13px] text-text-muted font-normal mt-1.5">
            기각 사유는 신고 처리 이력에 기록됩니다.
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-2 pb-1">
        <div className="flex flex-col gap-2">
          {PRESET_REASONS.map(reason => (
            <button
              key={reason}
              type="button"
              onClick={() => setSelected(prev => (prev === reason ? '' : reason))}
              className="flex items-center gap-3 px-3.5 py-[11.5px] rounded-sm text-left w-full cursor-pointer bg-white transition-colors"
              style={{
                border: `1px solid ${selected === reason ? 'var(--color-primary)' : 'var(--color-border)'}`,
              }}
            >
              <div
                className="shrink-0 size-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: selected === reason ? 'var(--color-primary)' : 'var(--color-border)',
                }}
              >
                {selected === reason && (
                  <div className="size-2 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-sm text-text-primary">{reason}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 pt-[7px]">
          <span className="text-xs font-semibold text-text-secondary">직접 입력 (선택)</span>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="기각 사유를 적어주세요."
            rows={3}
            className="w-full border border-border rounded-sm px-[13px] py-2.5 text-[13px] text-text-primary placeholder-text-disabled resize-none outline-none transition-colors focus:border-primary"
            style={{ fontFamily: 'inherit', minHeight: 76 }}
          />
        </div>

        {!hasReason && (
          <p className="text-xs text-danger">사유 없이는 기각할 수 없습니다.</p>
        )}

        <div className="flex justify-end gap-2 pt-[14px]">
          <Button
            onClick={handleClose}
            className="!border-border !text-text-primary !font-semibold !shadow-none !rounded-sm"
          >
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            className="!border-border !text-text-primary !font-semibold !shadow-none !rounded-sm"
            style={{ opacity: hasReason ? 1 : 0.5, cursor: hasReason ? 'pointer' : 'default' }}
          >
            기각 확정
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectModal;
