import { useState } from "react"
import { Button, Modal, message } from "antd"
import { footerButtonClassName } from "../styles"
import type { MaskingReasonCategory, ReviewDetail } from "../../../types";
import { useReviewActions } from "../../../hooks/useReviewActions";
import { useReviewAsideStore } from "../../../store/useReviewAsideStore";
import { useReviewMaskPreview } from "../../../hooks/useReviewMaskPreview";
import { MASK_REASON_CODE } from "../../../api/reviews";
import { MaskingModal } from "./MaskingModal";

const ReviewAsideFooter = ({review}: {review: ReviewDetail}) => {
    const { deleteReview, updateStatus, maskReview } = useReviewActions();
    const closeAside = useReviewAsideStore((state) => state.closeAside);
    const [maskingOpen, setMaskingOpen] = useState(false);
    const maskPreview = useReviewMaskPreview(review.id, maskingOpen);
    const nextStatus = review.status === 'public' ? 'PRIVATE' : 'PUBLIC';
    const nextStatusLabel = review.status === 'public' ? '비공개' : '공개';

    const handleUpdateStatus = () => {
        Modal.confirm({
            title: `리뷰를 ${nextStatusLabel} 처리할까요?`,
            content: `선택한 리뷰를 ${nextStatusLabel}로 변경합니다.`,
            okText: nextStatusLabel,
            cancelText: '취소',
            onOk: async () => {
                try {
                    await updateStatus.mutateAsync({
                        reviewId: review.id,
                        status: nextStatus,
                    });
                    message.success(`리뷰가 ${nextStatusLabel} 처리되었습니다.`);
                } catch (error) {
                    message.error(
                        error instanceof Error
                            ? error.message
                            : '리뷰 상태 변경에 실패했습니다.',
                    );
                    throw error;
                }
            },
        });
    };

    const handleMaskingConfirm = async (payload: {
        reasons: MaskingReasonCategory[];
        note: string;
    }) => {
        try {
            await maskReview.mutateAsync({
                reviewId: review.id,
                reasons: payload.reasons.map((reason) => MASK_REASON_CODE[reason]),
                detailReason: payload.note,
            });
            message.success('리뷰가 마스킹 처리되었습니다.');
            setMaskingOpen(false);
        } catch (error) {
            message.error(
                error instanceof Error
                    ? error.message
                    : '리뷰 마스킹에 실패했습니다.',
            );
        }
    };

    const handleDelete = () => {
        Modal.confirm({
            title: '리뷰를 삭제할까요?',
            content: '선택한 리뷰를 삭제합니다.',
            okText: '삭제',
            okType: 'danger',
            cancelText: '취소',
            onOk: async () => {
                try {
                    await deleteReview.mutateAsync(review.id);
                    message.success('리뷰가 삭제되었습니다.');
                    closeAside();
                } catch (error) {
                    message.error(
                        error instanceof Error
                            ? error.message
                            : '리뷰 삭제에 실패했습니다.',
                    );
                }
            },
        });
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-2 border-t border-border px-5 py-3.5">
                <Button
                    className={footerButtonClassName}
                    onClick={() => setMaskingOpen(true)}
                >
                    마스킹
                </Button>
                <Button
                    className={footerButtonClassName}
                    loading={updateStatus.isPending}
                    onClick={handleUpdateStatus}
                >
                    {nextStatusLabel}
                </Button>
                <Button
                    className={`${footerButtonClassName} text-danger!`}
                    loading={deleteReview.isPending}
                    onClick={handleDelete}
                >
                    삭제
                </Button>
                <Button className={footerButtonClassName}>복구</Button>
            </div>
            <MaskingModal
                open={maskingOpen}
                previewText={maskPreview.data ?? ''}
                previewLoading={maskPreview.isLoading}
                confirmLoading={maskReview.isPending}
                onCancel={() => setMaskingOpen(false)}
                onConfirm={handleMaskingConfirm}
            />
        </>
    )
}

export default ReviewAsideFooter;
