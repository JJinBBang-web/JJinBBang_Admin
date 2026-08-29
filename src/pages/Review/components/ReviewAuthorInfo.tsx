import { Descriptions } from "antd"
import type { ReviewDetail } from "../../../types";
import { sectionTitleClassName } from "../styles";

interface ReviewAuthorInfoProps {
  review: ReviewDetail;
}

const ReivewAuthorInfo = ({review}: ReviewAuthorInfoProps) => {
    return (
        <>
            <div className="flex flex-col gap-2.5">
                <span className={sectionTitleClassName}>
                  작성자 정보 (개인정보 마스킹)
                </span>
                <Descriptions
                  column={1}
                  colon={false}
                  labelStyle={{
                    width: 90,
                    color: '#9A9A9A',
                    fontSize: 13,
                    padding: 0,
                  }}
                  contentStyle={{
                    color: '#1A1A1A',
                    fontSize: 13,
                    padding: 0,
                  }}
                  className="
                    [&_.ant-descriptions-row]:mb-1.5!
                    [&_.ant-descriptions-item]:pb-0!
                  "
                  items={[
                    {
                      key: 'nickname',
                      label: '닉네임',
                      children: review.authorInfo.nickname,
                    },
                    {
                      key: 'email',
                      label: '이메일',
                      children: review.authorInfo.email,
                    },
                  ]}
                />
              </div>
        </>
    )
}

export default ReivewAuthorInfo;
