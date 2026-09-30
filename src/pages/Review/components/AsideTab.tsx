import { Drawer } from 'antd';
import type { ReviewDetail } from '../../../types';
import ReviewAsideHeader from './ReviewAsideHeader';
import ReviewSummary from './ReviewSummary';
import ReviewAuthorInfo from './ReviewAuthorInfo';
import ReviewReportHistory from './ReviewReportHistory';
import ReviewActionHistory from './ReviewActionHistory';
import ReviewAsideFooter from './ReviewAsideFooter';

export interface AsideTabProps {
  open: boolean;
  onClose: () => void;
  review: ReviewDetail | null;
  isLoading?: boolean;
}

export const AsideTab = ({
  open,
  onClose,
  review,
  isLoading = false,
}: AsideTabProps) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={480}
      closable={false}
      loading={isLoading}
      styles={{
        body: { padding: 0, display: 'flex', flexDirection: 'column' },
        header: { display: 'none' },
      }}
      className="
        [&_.ant-drawer-content]:shadow-drawer!
        [&_.ant-drawer-content]:border-l!
        [&_.ant-drawer-content]:border-border!
      "
    >
      <div className="flex h-full flex-col bg-white">
        <ReviewAsideHeader onClose={onClose}/>

        {review && (
          <>
            <div className="flex flex-1 flex-col gap-5.25 overflow-y-auto p-5">
              <ReviewSummary review={review}/>
              <ReviewAuthorInfo review={review}/>
              <ReviewReportHistory review={review}/>
              <ReviewActionHistory review={review}/>
            </div>
            <ReviewAsideFooter/>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default AsideTab;
