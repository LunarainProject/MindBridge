import React from 'react';
import { connect } from 'react-redux';
import CombineAction from '../CombineAction';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Counter extends React.Component<ICountProperties> {
    render() {
      return (
        <View style={s.container}>
          <Text allowFontScaling={false} style={{ fontSize: 20 }}>{this.props.Count}</Text>
          <TouchableOpacity style={s.upButton} onPress={() => this.props.CountUp(1)}>
            <Text allowFontScaling={false} style={{ fontSize: 20 }}>+1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.upButton} onPress={() => this.props.CountUp(2)}>
            <Text allowFontScaling={false} style={{ fontSize: 20 }}>+2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.downButton} onPress={() => this.props.CountUp(-1)}>
            <Text allowFontScaling={false} style={{ fontSize: 20 }}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.downButton} onPress={() => this.props.CountUp(-2)}>
            <Text allowFontScaling={false} style={{ fontSize: 20 }}>-2</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  
  const s = StyleSheet.create({
    container: {
      marginTop: 30,
      flexDirection: 'row',
      alignItems: 'center'
    },
    upButton: {
      marginLeft: 20,
      backgroundColor: 'cyan',
      padding: 10,
      borderRadius: 20
    },
    downButton: {
      marginLeft: 20,
      backgroundColor: 'pink',
      padding: 10,
      borderRadius: 20
    },
  });
  
  interface ICountProperties {
    Count: any
    CountUp: Function
    CountDown: Function
  }

  function mapStateToProps(state: any) {
    return {
      Count: state.Count.Count
    };
  }
  
  function mapDispatchToProps(dispatch: Function) {
    return {
      CountUp: (num: number) => {
        dispatch(CombineAction.CountUp(num));
      },
      CountDown: (num: number) => {
        dispatch(CombineAction.CountDown(num));
      }
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Counter);