import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import OrderCard, { OrderLoadingCard } from 'src/components/OrderCard'
import { orders, store } from 'src/models/mock-data'
import { sleep } from 'src/utils/commons'
import styled from 'styled-components'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import grey from '@material-ui/core/colors/grey'
import StoreRoundedIcon from '@material-ui/icons/StoreRounded'
import TopHeader from 'src/components/TopHeader'

const GridContainerUl = styled.ul`
  display: grid;
  gap: 3rem;
`

const description = '내가 지금까지 주문한 내역을 확인해보세요.'

const StyledStoreRoundedIcon = { fontSize: 28, color: grey[800] }

const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`

function UserOrdersPage() {
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)
  const [hasMoreOrders, setHasMoreOrders] = useState(true)

  async function fetchMoreMenus() {
    setIsLoadingOrders(true)
    await sleep(5000) // fetchMoreMenus(from, count)
    setIsLoadingOrders(false)

    console.log('page:')

    setHasMoreOrders(false)
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoadingOrders,
    hasNextPage: hasMoreOrders,
    onLoadMore: fetchMoreMenus,
  })

  return (
    <PageHead title="Deple - 주문 내역" description={description}>
      <PageLayout>
        <TopHeader>
          <FlexContainerCenterCenter>
            <StoreRoundedIcon style={StyledStoreRoundedIcon} />
            <NoMarginH3>주문내역</NoMarginH3>
          </FlexContainerCenterCenter>
        </TopHeader>
        <h2>주문 내역</h2>
        <GridContainerUl>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} store={order.store} />
          ))}

          {(isLoadingOrders || hasMoreOrders) && (
            <div ref={sentryRef}>
              <OrderLoadingCard />
            </div>
          )}
        </GridContainerUl>
      </PageLayout>
    </PageHead>
  )
}

export default UserOrdersPage
