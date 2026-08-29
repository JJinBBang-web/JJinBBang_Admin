interface ReviewAsideHeaderProps {
  onClose: () => void;
}

const ReviewAsideHeader = ({onClose}: ReviewAsideHeaderProps) => {
    return (
        <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-border bg-white text-[15px] text-text-secondary transition-colors hover:bg-bg-light"
          >
            ✕
          </button>
          <h2 className="mb-0! text-base font-bold text-text-primary">리뷰 상세</h2>
        </div>
    )
}

export default ReviewAsideHeader;
