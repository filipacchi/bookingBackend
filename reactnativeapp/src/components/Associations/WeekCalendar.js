import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, PanResponder } from 'react-native';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';

const WeekCalendar = () => {
  const today = moment(); // Get the current date
  const [selectedDay, setSelectedDay] = useState(today); // State to keep track of the selected day
  const [weekDates, setWeekDates] = useState([]); // State to store the week dates
  const [prevArrowPressed, setPrevArrowPressed] = useState(false); // State to track if the previous arrow is pressed
  const [nextArrowPressed, setNextArrowPressed] = useState(false); // State to track if the next arrow is pressed

  useEffect(() => {
    // Update the weekDates array whenever the selectedDay changes
    const updatedWeekDates = Array.from({ length: 7 }).map((_, i) =>
      selectedDay.clone().startOf('isoWeek').add(i, 'days')
    );
    setWeekDates(updatedWeekDates);
  }, [selectedDay]);

  const handlePrevWeek = () => {
    setSelectedDay((prev) => prev.clone().subtract(7, 'days')); // Decrement the selected day by 1 week
    setPrevArrowPressed(true); // Set the previous arrow pressed state to true
    // Revert the previous arrow pressed state back to false after x milliseconds
    setTimeout(() => {
      setPrevArrowPressed(false);
    }, 100);
  };

  const handleNextWeek = () => {
    setSelectedDay((prev) => prev.clone().add(7, 'days')); // Increment the selected day by 1 week
    setNextArrowPressed(true); // Set the next arrow pressed state to true
    // Revert the next arrow pressed state back to false after x milliseconds
    setTimeout(() => {
      setNextArrowPressed(false);
    }, 100);
  };

  const SwipeableWeekView = ({ onSwipeLeft, onSwipeRight, children }) => {
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dx > 0 && gestureState.dx > gestureState.dy) {
            handlePrevWeek();
          } else if (gestureState.dx < 0 && -gestureState.dx > gestureState.dy) {
            handleNextWeek();
          }
        },
      })
    ).current;

    return (
      <View {...panResponder.panHandlers}>
        {children}
      </View>
    );
  };

  return (
    <View style={{ padding: 10, backgroundColor: "white"}}>
      {/* Render the week days */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          marginBottom: 20,
        }}
      >
        {/* Render the previous week arrow */}
        <TouchableWithoutFeedback onPress={handlePrevWeek}>
          <View
            style={{
              backgroundColor: prevArrowPressed ? 'lightblue' : 'transparent',
              borderRadius: 50,
            }}
          >
            <Feather name="arrow-left-circle" size={24} color="black" />
          </View>
        </TouchableWithoutFeedback >

        {/* Render the current month and year */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            
            //marginVertical: 16,
          }}
        >
          <Text >{selectedDay.format('MMMM YYYY')}</Text>
        </View>

        {/* Render the next week arrow */}
        <TouchableWithoutFeedback onPress={handleNextWeek}>
          <View
            style={{
              //padding: 16,
              backgroundColor: nextArrowPressed ? 'lightblue' : 'transparent',
              borderRadius: 50,
            }}
          >
            <Feather name="arrow-right-circle" size={24} color="black" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <SwipeableWeekView>
      {/* Render the week days */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
      >
        {/* Render the individual days */}
        {weekDates.map((currentDate) => {
          return (
            <TouchableWithoutFeedback
              key={currentDate.toString()}
              onPress={() => setSelectedDay(currentDate)}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  borderRadius: 50,
                  overflow: 'hidden',
                }}
              >
                <Text style={{}}>{currentDate.format('dddd').slice(0, 1)}</Text>
                <View
                  style={{
                    marginTop: 10,
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 60,
                    backgroundColor: currentDate.isSame(selectedDay, 'day') ? currentDate.isSame(today, 'day') ? "red": "#53d5d5" : 'transparent',
                  }}
                >
                  <Text style={{color: currentDate.isSame(selectedDay, 'day') ? "white" : currentDate.isSame(today, 'day') ? 'red' : 'black', }}>{currentDate.format('D')}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      </SwipeableWeekView>
    </View>
  );
};


export default WeekCalendar;
