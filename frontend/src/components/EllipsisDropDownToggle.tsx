import React from 'react'
import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

type Props = {
  onClick: () => void
}
const EllipsisDropDownToggle = React.forwardRef(
  ({ onClick }: Props, ref: any) => (
    <View ref={ref}>
      <FontAwesomeIcon
        icon={faEllipsisH}
        color="white"
        pull="right"
        onClick={e => {
          e.preventDefault()
          onClick(e)
        }}
      />
    </View>
  )
)

export default EllipsisDropDownToggle
