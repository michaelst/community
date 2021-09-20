import { Dimensions, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const useAppStyles = () => {
  const { colors }: any = useTheme()

  const fontSize = 18
  const secondaryFontSize = 14
  const baseUnit = 8

  const styles = StyleSheet.create({
    activityIndicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: colors.text,
      fontSize: fontSize
    },
    dangerText: {
      color: colors.danger,
      fontSize: fontSize
    },
    secondaryText: {
      color: colors.secondary,
      fontSize: secondaryFontSize
    },
    rightText: {
      color: colors.secondary,
      fontSize: fontSize,
      paddingRight: baseUnit
    },
    headerTitleText: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: fontSize
    },
    headerButtonText: {
      color: colors.primary,
      fontSize: fontSize,
      paddingLeft: baseUnit * 2,
      paddingRight: baseUnit * 2
    },
    smallButtonText: {
      color: colors.primary,
      fontSize: secondaryFontSize,
      paddingTop: baseUnit,
      paddingLeft: baseUnit * 2,
      paddingRight: baseUnit * 2
    },
    sectionHeaderText: {
      backgroundColor: colors.background,
      color: colors.secondary,
      padding: baseUnit,
      paddingBottom: 5
    },
    sectionFooterText: {
      backgroundColor: colors.background,
      color: colors.secondary,
      padding: baseUnit,
      paddingTop: 5
    },
    deleteButtonText: {
      color: 'white',
      fontSize: fontSize,
      padding: baseUnit,
      fontWeight: 'bold'
    },
    deleteButton: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors.danger,
      justifyContent: 'flex-end'
    },
    row: {
      flexDirection: 'row',
      padding: baseUnit * 2,
      alignItems: 'center',
      backgroundColor: colors.card,
      borderBottomColor: colors.border,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    card: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      margin: baseUnit,
      marginBottom: baseUnit * 2,
      backgroundColor: colors.card,
      borderRadius: baseUnit / 2
    },
    cardHeaderContainer: {
      width: '100%',
      padding: baseUnit * 2,
      justifyContent: 'flex-start',
      borderBottomColor: colors.border,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    cardHeaderText: {
      fontSize: fontSize * 0.8,
      color: colors.muted
    },
    cardBodyContainer: {
      width: '100%',
      padding: baseUnit * 2
    },
    formInputText: {
      width: '100%',
      fontSize: fontSize,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: baseUnit / 2,
      padding: baseUnit,
      marginTop: baseUnit
    },
    sectionListContentContainerStyle: {
      paddingBottom: baseUnit * 4
    },
    flatlistContentContainerStyle: {
      paddingTop: baseUnit * 4,
      paddingBottom: baseUnit * 4
    },
    fullScreenContainer: {
      height: '100%',
      width: Dimensions.get('window').width,
      padding: baseUnit * 5,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonContainer: {
      marginTop: 10,
      width: Dimensions.get('window').width / 1.8,
      height: Dimensions.get('window').height / 20,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 2,
      marginBottom: baseUnit * 2
    }
  })

  return {
    styles: styles,
    colors: colors,
    fontSize: fontSize,
    baseUnit: baseUnit
  }
}

export default useAppStyles
