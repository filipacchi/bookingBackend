import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import Style from '../../screens/Style';
import { AuthContext } from '../../../auth/UserContextProvider';

const SwipeableCalendar = ({ selectedDay, setSelectedDay, bookAhead }) => {
  const today = moment()
  const [dateArray, setDateArray] = useState()
  const {colorTheme, authContext} = useContext(AuthContext)
  const {t} = authContext
  const flatListRef = useRef(null)

 

  const createMonthArray = () => {
    let dateArrayTemp = new Array();
    let dateObject = {}
    let currentDate = today.clone()
    console.log("BOOKAHEAD: "+bookAhead)
    let endDate = today.clone().add(parseInt(bookAhead), "weeks")
    while(currentDate <= endDate){
      dateObject = {
        weekDay: currentDate.format("dddd").slice(0,3),
        day: currentDate.clone(),
        month: currentDate.format('MMMM').slice(0,3)
      }
      dateArrayTemp.push(dateObject)  
      currentDate.add(1, "days")
    }
    return dateArrayTemp
  }

  useEffect(() => {
    // Update the weekDates array whenever the selectedDay changes
    setDateArray(createMonthArray())
  }, []);


  return (
    <View>
      <FlatList
      ref={flatListRef}
      data={dateArray}
      horizontal={true}
      renderItem={
        ({ item, index }) => {
          selDay = selectedDay.format("Y-MM-DD")
          itemDay = item.day.format("Y-MM-DD")
          return(
            <TouchableOpacity 
            activeOpacity={0.5}
            onPress={() => {
              console.log("VALDDAG: "+item.day)
              flatListRef.current.scrollToIndex({
                index: index,
                animated: true,
                viewPosition: 0.5, // 0.5 means center of the container
              });
                setSelectedDay(item.day)
            }} 
            style={[Style.calendarOuterItemBox, {borderBottomColor: selDay == itemDay ? colorTheme.firstColor : "transparent"}]}>
              
                <Text style={[Style.textWeekDay, {color: selDay == itemDay ? colorTheme.firstColor : "grey"}]}>{t(item.weekDay)}</Text>
                <Text style={[Style.textDayNum, {color: selDay == itemDay ? colorTheme.firstColor : "black"}]}>{item.day.format('D')}</Text>
                <Text style={[Style.textMonth, {color: selDay == itemDay ? colorTheme.firstColor : "grey"}]}>{t(item.month)}</Text>
            </TouchableOpacity>
            )
        }
    }
      >

      </FlatList>
    </View>
  );
};


export default SwipeableCalendar;
