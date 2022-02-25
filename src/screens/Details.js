import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../assets/Colors';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

Notifications.setNotificationHandler({
  handleNotification: () => {
    return ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      // shouldSetBadge: true,
    })
  }
})

const Details = ({ route, navigation }) => {

  //notification
  const [pushToken, setPushToken] = useState();
  console.log('push token:', pushToken)

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          throw new Error('Permission not granted!');
        }
      })
      .then(() => {
        console.log('getting token');
        return Notifications.getExpoPushTokenAsync();
      })
      .then(response => {
        const token = response.data;
        setPushToken(token);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }, []);

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    })

    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    })

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    }

  }, [])

  const triggerNotifications = () => {
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'Hello',
    //     body: 'This is a test notification',
    //   },
    //   trigger: {
    //     seconds: 5,
    //   }
    // })
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: pushToken,
        data: { extraData: 'Some data' },
        title: 'Sent via MealDeal',
        body: 'Your order has been placed',
      }),
    });
  }



  const { title, price, sizeNumber, sizeName, crust, deliveryTime, image, ingredients } = route.params;

  const renderIngredientsItem = ({ item }) => {
    return (
      <View style={[styles.ingredientsListContainer, styles.shadowProps, {marginLeft: item.id == '1' ? 20 : 0}]}>
        <Image source={item.image} style={styles.ingredientsImg} />
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.headerLeft}>
            <Feather name="chevron-left" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <MaterialCommunityIcons name="star" size={24} color="white" />
        </View>
      </View>

      {/* Titles */}
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Price */}
      <View style={styles.priceWrapper}>
        <Text style={styles.price}>${price}</Text>
      </View>

      {/* Pizza info */}
      <View style={styles.infoWrapper}>
        <View style={styles.infoLeft}>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Size</Text>
            <Text style={styles.infoItemText}>{sizeName} {sizeNumber}"</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Crust</Text>
            <Text style={styles.infoItemText}>{crust}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Delivery in</Text>
            <Text style={styles.infoItemText}>{deliveryTime} min</Text>
          </View>
        </View>
        <View style={styles.infoRight}>
          <Image source={image} style={styles.infoImage} />
        </View>
      </View>

      {/* Ingredients */}
      <View style={styles.ingredientsWrapper}>
        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        <View style={styles.ingredientsList}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={ingredients}
            renderItem={renderIngredientsItem}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {/* Place an order */}
      <TouchableOpacity onPress={triggerNotifications}>
        <View style={styles.placeOrder}>
          <Text style={styles.placeOrderTxt}>Place an order</Text>
          <Feather name="chevron-right" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerLeft: {
    borderColor: Colors.textLight,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  headerRight: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  titleWrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    color: Colors.textDark,
    width: '50%',
    fontWeight: 'bold',
  },
  priceWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  price: {
    color: Colors.price,
    fontWeight: 'bold',
    fontSize: 32,
  },
  infoWrapper: {
    flexDirection: 'row',
    marginTop: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLeft: {
    paddingLeft: 20,
  },
  infoRight: {},
  infoItem: {
    marginBottom: 20,
  },
  infoItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textLight,
  },
  infoItemText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.textDark,
  },
  infoImage: {
    resizeMode: 'contain',
    marginLeft: 50,
  },
  ingredientsWrapper: {
    marginTop: 40,
  },
  ingredientsTitle: {
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textDark,
  },
  ingredientsList: {
    paddingVertical: 20,
  },
  ingredientsListContainer: {
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginRight: 15,
    borderRadius: 15,
  },
  shadowProps: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  ingredientsImg: {
    resizeMode: 'contain',
  },
  placeOrder: {
    marginVertical: 40,
    marginHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderTxt: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },

});
