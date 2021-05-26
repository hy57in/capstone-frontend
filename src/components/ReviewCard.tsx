import TReview from 'src/types/Review'
import styled from 'styled-components'
import { Card, Avatar, Divider, Tag } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

const { Meta } = Card

type LoadingProps = {
  onlyImage: boolean
}

export function ReviewLoadingCard({ onlyImage }: LoadingProps) {
  return <div />
}

type Props = {
  onlyImage: boolean
  review: TReview
}

function ReviewCard({ onlyImage, review }: Props) {
  return (
    <Card
      style={{ width: 350 }}
      cover={
        <img
          alt="example"
          src="data:image/jpeg;base64,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"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="data:image/jpeg;base64,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" />
        }
        title="김빵순"
        description="BEST 리뷰어"
      />
      <Divider />
      <div>
        <Tag color="#F57961">#딸기</Tag>
        <Tag color="#2ECCBA">#말차</Tag>
        <Tag color="#5C4D42">#초코</Tag>
        <Tag color="#C4C4C4">#저탄수</Tag>
      </div>
      <Divider />
      <p>
        하이~ 에이치아이~ 우리 오빠들 오프라인 팬미팅 절대 못하니까.. 집에서 무대 보면서 먹으려고
        시켰는데 역시 맛있네요ㅠㅠ 자주 사먹을게용ㅎㅎ 그럼 BYE~ 비와이이~
      </p>
    </Card>
  )
}

export default ReviewCard
