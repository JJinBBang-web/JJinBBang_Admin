import type { ReportSortOrder } from '../../../types';
import { FilterSelect } from '../../../components/common/FilterSelect';
import { ForbiddenWordManageButton } from '../../../components/common/ForbiddenWordManageButton';
import { REPORT_SORT_OPTIONS } from '../constants';
import { reportFilterStyles } from '../styles';

interface ReportFilterProps {
  sortOrder: ReportSortOrder;
  onSortOrderChange: (value: ReportSortOrder) => void;
}

export const ReportFilter = ({ sortOrder, onSortOrderChange }: ReportFilterProps) => {
  return (
    <div className="flex items-center justify-end gap-2.5">
      <FilterSelect
        value={sortOrder}
        onChange={onSortOrderChange}
        options={REPORT_SORT_OPTIONS}
        className={reportFilterStyles.select}
      />
      <ForbiddenWordManageButton />
    </div>
  );
};

export default ReportFilter;
