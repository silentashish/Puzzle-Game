import { ScaledSheet } from "react-native-size-matters";
import { colors } from '../../utils'

export const styles = ScaledSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.primaryColor
  },
  levelText: {
    textAlign: 'center', 
    fontSize: '30@ms', 
    margin: '10@ms'
  },
  timeText: {
    marginBottom: '5@ms',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20@ms',
  },
  timesText: {
    textAlign: 'center', 
    fontSize: '25@ms',
    marginBottom: '5@ms'
  },
  problemIndex: {
    textAlign: 'center', 
    fontSize: '20@ms', 
    fontWeight: 'bold',
    marginBottom: '20@ms',
    marginTop: '20@ms'
  },
  timeLifeView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  oldAnswerView: {
    flexDirection: 'row',
    paddingRight: '25@ms',
    paddingLeft: '25@ms',
    marginBottom: '15@ms',
  },
  oldAnswerSubView: {
    borderRadius: '10@ms',
    backgroundColor: '#a1a1a1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '10@ms',
    paddingLeft: '10@ms',
    paddingTop: '5@ms',
    paddingBottom: '5@ms',
    minWidth: '100@ms',
  },
  itemText: {
    fontSize: '20@ms', 
    textAlign: 'center'
  },
  lifeText: {
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20@ms',
  },
  heartView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '5@ms',
  },
  instruction: {
      marginHorizontal: '20@ms',
      fontSize: '15@ms',
      marginBottom: '20@ms'
  }
})