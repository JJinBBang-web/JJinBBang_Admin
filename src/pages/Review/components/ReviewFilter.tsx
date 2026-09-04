import { Input } from "antd";
import { SCHOOL_OPTIONS, PERIOD_OPTIONS, STATUS_OPTIONS, SORT_OPTIONS } from "../constants";
import { FilterSelect } from "../../../components/common/FilterSelect";
import { ForbiddenWordManageButton } from "../../../components/common/ForbiddenWordManageButton";
import { reviewFilterStyles } from "../styles";
import { useReviewFilterStore } from "../../../store/useReviewFilterStore";

const ReviewFilter = () => {

    const filter = useReviewFilterStore();

    return (
      <div className="flex items-center gap-2.5">
        <Input
          placeholder="🔍 키워드·작성자 검색"
          value={filter.keyword}
          onChange={(e) => filter.setKeyword(e.target.value)}
          className="h-9! w-72! text-[13px]! rounded-[18px]! border-border! px-3! shadow-none!"
          allowClear
        />

        <FilterSelect
            value={filter.school}
            options={SCHOOL_OPTIONS}
            onChange={filter.setSchool}
            className={reviewFilterStyles.select}
        />
        <FilterSelect
          value={filter.period}
          onChange={filter.setPeriod}
          options={PERIOD_OPTIONS}
          className={reviewFilterStyles.select}
        />
        <FilterSelect
          value={filter.status}
          onChange={filter.setStatus}
          options={STATUS_OPTIONS}
          className={reviewFilterStyles.select}
        />

        <button
          type="button"
          role="switch"
          aria-checked={filter.bannedWordsOnly}
          onClick={() => filter.setBannedWordsOnly(!filter.bannedWordsOnly)}
          className="flex items-center gap-2.5"
        >
          <span
            className={`relative inline-flex h-[22px] w-[38px] shrink-0 rounded-[11px] transition-colors ${
              filter.bannedWordsOnly ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`absolute top-[2px] size-[18px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-transform ${
                filter.bannedWordsOnly ? 'translate-x-[18px]' : 'translate-x-[2px]'
              }`}
            />
          </span>
          <span className="text-xs font-semibold text-text-secondary">
            ⚠️ 금칙어만 보기
          </span>
        </button>

        <div className="ml-auto flex items-center gap-2.5">
          <FilterSelect
            value={filter.sortOrder}
            onChange={filter.setSortOrder}
            options={SORT_OPTIONS}
            className={reviewFilterStyles.select}
          />
          <ForbiddenWordManageButton />
        </div>
      </div>
    )
}

export default ReviewFilter;