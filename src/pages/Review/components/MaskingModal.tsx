import { useState } from 'react';
import { Button, Modal } from 'antd';
import type { MaskingReasonCategory } from '../../../types';
import { MASKING_REASON_OPTIONS } from '../constants';

export interface MaskingModalProps {
  open: boolean;
  previewText: string;
  previewLoading?: boolean;
  onCancel: () => void;
  onConfirm: (payload: {
    reasons: MaskingReasonCategory[];
    note: string;
  }) => void;
  confirmLoading?: boolean;
}

const actionButtonClassName =
  'border-border! text-text-primary! font-semibold! shadow-none! rounded-sm!';

export const MaskingModal = ({
  open,
  previewText,
  previewLoading,
  onCancel,
  onConfirm,
  confirmLoading,
}: MaskingModalProps) => {
  const [selectedReasons, setSelectedReasons] = useState<MaskingReasonCategory[]>([]);
  const [note, setNote] = useState('');

  const reset = () => {
    setSelectedReasons([]);
    setNote('');
  };

  const toggleReason = (reason: MaskingReasonCategory) => {
    setSelectedReasons(prev =>
      prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason],
    );
  };

  const canConfirm = selectedReasons.length > 0 && !previewLoading;

  // 요청이 끝나 모달이 닫힐 때(afterClose) 입력값을 초기화한다.
  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm({
      reasons: selectedReasons,
      note: note.trim(),
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      afterClose={reset}
      footer={null}
      width={460}
      transitionName=""
      maskTransitionName=""
      title={
        <div className="pb-1">
          <p className="text-[17px] font-bold text-text-primary leading-tight">부분 마스킹</p>
          <p className="text-[13px] text-text-muted font-normal mt-1.5">
            마스킹은 본문을 직접 수정하지 않고 노출만 가립니다. 마스킹 사유는 조치 이력에
            기록됩니다.
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-2 pb-1">
        <div className="flex flex-col gap-1.5 pb-[7px]">
          <span className="text-xs font-semibold text-text-secondary">마스킹 결과 미리보기</span>
          <p className="rounded-sm border border-border-light bg-bg-light px-3.5 py-[11.5px] text-sm text-text-primary whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
            {previewLoading
              ? '미리보기를 불러오는 중입니다...'
              : previewText || '미리보기할 본문이 없습니다.'}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {MASKING_REASON_OPTIONS.map(reason => (
            <button
              key={reason}
              type="button"
              onClick={() => toggleReason(reason)}
              className={`flex items-center gap-3 px-3.5 py-[11.5px] rounded-sm text-left w-full cursor-pointer bg-white transition-colors border ${
                selectedReasons.includes(reason) ? 'border-primary' : 'border-border'
              }`}
            >
              <div
                className={`shrink-0 size-4 rounded-[3px] border-2 flex items-center justify-center transition-colors ${
                  selectedReasons.includes(reason)
                    ? 'border-primary bg-primary'
                    : 'border-border bg-white'
                }`}
              >
                {selectedReasons.includes(reason) && (
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden="true">
                    <path
                      d="M2.5 6.2 5 8.5l4.5-5"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
            placeholder="조치 사유를 구체적으로 적어주세요."
            rows={3}
            className="w-full border border-border rounded-sm px-[13px] py-2.5 text-[13px] text-text-primary placeholder-text-disabled resize-none outline-none transition-colors focus:border-primary"
            style={{ fontFamily: 'inherit', minHeight: 76 }}
          />
        </div>

        {selectedReasons.length === 0 && (
          <p className="text-xs text-danger">사유 입력 전에는 [확인]이 비활성 상태예요.</p>
        )}

        <div className="flex justify-end gap-2 pt-[14px]">
          <Button onClick={onCancel} className={actionButtonClassName}>
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            type="primary"
            disabled={!canConfirm}
            loading={confirmLoading}
          >
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};
