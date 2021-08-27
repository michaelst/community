import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const appStyles = () => {
  const { colors }: any = useTheme()

  const fontSize = 18
  const secondaryFontSize = 14
  const baseUnit = 8
  
  const styles = StyleSheet.create({
    activityIndicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colors.text,
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
      backgroundColor: '#dd2c00',
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
      alignItems: 'center',
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
      color: colors.muted,
    },
    cardBodyContainer: {
      width: '100%',
      padding: baseUnit * 2,
    },
    cardBodyText: {
      fontSize: fontSize,
      color: colors.text
    },
    formInputText: {
      textAlign: 'right',
      width: '100%',
      fontSize: fontSize,
      color: colors.secondary
    },
    sectionListContentContainerStyle: {
      paddingBottom: baseUnit * 4
    },
    flatlistContentContainerStyle: {
      paddingTop: baseUnit * 4,
      paddingBottom: baseUnit * 4
    }
  })

  return {
    styles: styles,
    fontSize: fontSize,
    baseUnit: baseUnit
  }
} 

export default appStyles