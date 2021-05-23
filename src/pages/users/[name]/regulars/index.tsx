import { useContext } from 'react'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import StoreCard from 'src/components/StoreCard'
import { useRegularStoresQuery } from 'src/graphql/generated/types-and-hooks'
import { GlobalContext } from 'src/pages/_app'
import styled from 'styled-components'
import { Button } from 'antd'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import useGoToPage from 'src/hooks/useGoToPage'
import LocalActivityRoundedIcon from '@material-ui/icons/LocalActivityRounded'

const GridContainerBackground = styled.div`
  display: grid;
  gap: 0.5rem;

  background: #eee;
  border: 1px solid #eee;
`

const description = '자기가 찜한 메뉴를 확인해보세요'

const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`
const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledLocalActivityRoundedIcon = { fontSize: 30, color: grey[800] }

function UserRegularStoresPage() {
  const { user } = useContext(GlobalContext)

  const regularStoresQueryResult = useRegularStoresQuery({
    onError: handleApolloError,
    skip: !user,
  })

  const regularStores = regularStoresQueryResult.data?.me.regularStores

  const goMainPage = useGoToPage('/')

  return (
    <PageHead title="디저트핏 - 단골 매장" description={description}>
      <PageLayout>
        <TopHeader>
          <FlexContainerCenterCenter>
            <FlexContainerAlignCenter>
              <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goMainPage} />
            </FlexContainerAlignCenter>
            <LocalActivityRoundedIcon style={StyledLocalActivityRoundedIcon} />
            <NoMarginH3>단골</NoMarginH3>
          </FlexContainerCenterCenter>
        </TopHeader>
        <GridContainerBackground>
          {regularStores?.map((regularStore) => (
            <StoreCard key={regularStore.id} store={regularStore} />
          ))}
          {!regularStores?.length && <h4>텅! 단골 매장이 없어요..</h4>}
        </GridContainerBackground>
      </PageLayout>
    </PageHead>
  )
}

export default UserRegularStoresPage
