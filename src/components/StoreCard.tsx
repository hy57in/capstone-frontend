import FaceIcon from '@material-ui/icons/Face'
import RefreshIcon from '@material-ui/icons/Refresh'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import TStore from 'src/types/Store'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../styles/FlexContainer'
import styles from '../styles/NextImage.module.css'
import { BoldA } from './MenuCard'

const BackgroundColorLi = styled.li`
  background: #fff;
`

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
  padding: 0.5rem;
`

const RelativePosition = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
`

type Props = {
  store: TStore
}

function StoreCard({ store }: Props) {
  const router = useRouter()

  function goToStoreMenuPage() {
    router.push(`/stores/${store.name}`)
  }

  return (
    <BackgroundColorLi onClick={goToStoreMenuPage}>
      <FlexContainerBetweenCenter>
        <RelativePosition>
          <Image
            src={store.imageUrl}
            alt="store"
            layout="fill"
            objectFit="cover"
            className={styles.storeCard}
          />
        </RelativePosition>
        <h3>{store.name}</h3>
        <ul>
          {store.hashtags.map((hashtag) => (
            <>
              <li key={hashtag}>
                <Link href={`/search/${hashtag.slice(1)}`}>
                  <BoldA
                    href={`/search/${hashtag.slice(1)}`}
                    onClick={(e) => e.stopPropagation()}
                  >{`${hashtag}`}</BoldA>
                </Link>
              </li>
            </>
          ))}
        </ul>
        <ul>
          <FlexContainerAlignCenter>
            <FaceIcon />
            <div>{store.regularCount}명</div>
          </FlexContainerAlignCenter>
          <FlexContainerAlignCenter>
            <RefreshIcon />
            <div>{store.reorderRatio}%</div>
          </FlexContainerAlignCenter>
        </ul>
      </FlexContainerBetweenCenter>
    </BackgroundColorLi>
  )
}

export default StoreCard
