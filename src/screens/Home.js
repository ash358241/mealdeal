import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../assets/Colors';
import Category from '../../assets/data/Category';
import Popular from '../../assets/data/Popular';

const Home = () => {

  const renderCategoryItem = ({item}) => {
    return (
      <View style={[styles.categoryItemWrapper, {
        backgroundColor: item.selected ? Colors.primary : Colors.white,
        marginLeft: item.id == 1 ? 20 : 0,
      }]}>
        <Image source={item.image} style={styles.categoryItemImg}/> 
        <Text style={styles.categoryItemTitle}>{item.title}</Text>
        <View style={[styles.categorySelectWrapper, {
          backgroundColor: item.selected ? Colors.white : Colors.secondary,
        }]}>
        <Feather style={styles.categorySelectIcon} name="chevron-right" size={10} 
        color={item.selected ? Colors.black : Colors.white} />
        </View>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Image source={require('../../assets/images/profile.png')} style={styles.profileImg} />
        <Feather name="menu" size={24} color="black" />
      </View>

      {/* title */}
      <View style={styles.titleWrapper}>
        <Text style={styles.subtitle}>Food</Text>
        <Text style={styles.title}>Delivery</Text>
      </View>

      {/* search */}
      <View style={styles.searchWrapper}>
        <Feather name="search" size={24} color="black" />
        <View style={styles.search}>
          <Text style={styles.searchTxt}>Search</Text>
        </View>
      </View>

      {/* categories */}
      <View style={styles.categoriesWrapper}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <View style={styles.categoriesList}>
          <FlatList
          showsHorizontalScrollIndicator={false}
            data={Category}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </View>
      </View>

      {/* popular */}
      <View style={styles.popularWrapper}>
        <Text style={styles.popularTitle}>Popular</Text>
        {
          Popular.map(item => (
            <View style={[styles.popularCardWrapper, {
              marginTop: item.id == 1 ? 10 : 20,
            }]}>
              <View>
                <View>
                  <View style={styles.popularTopWrapper}>
                  <MaterialCommunityIcons name="crown-outline" size={12} color={Colors.primary} />
                  <Text style={styles.popularTopTxt}>top of the week</Text>
                  </View>
                  <View style={styles.popularTitleWrapper}>
                   <Text style={styles.popularTitlesTitle}>{item.title}</Text>
                   <Text style={styles.popularTitlesWeight}>{item.weight}</Text>
                  </View>
                </View>
                <View style={styles.popularCardBottom}>
                  <View style={styles.addPizzaBtn}>
                  <Feather name="plus" size={12} color="black" />
                  </View>
                  <View style={styles.ratingWrapper}>
                  <Feather name="star" size={12} color="black" />
                  <Text style={styles.rating}>{item.rating}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.popularCardRight}>
                <Image source={item.image} style={styles.popularCardImg} />
              </View>
            </View>
          ))
        }
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  titleWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textDark,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginTop: 5,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  search: {
    flex: 1,
    borderBottomColor: Colors.textLight,
    borderBottomWidth: 2,
    marginLeft: 10,
  },
  searchTxt: {
    fontSize: 14,
    opacity: 0.5,
    marginBottom: 5,
  },
  categoriesWrapper: {
    marginTop: 30,
  },
  categoriesTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },
  categoriesList: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  categoryItemWrapper: {
    backgroundColor: '#F5CA48',
    marginRight: 20,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryItemImg: {
    width: 60,
    height: 60,
    marginTop: 25,
    alignSelf: 'center',
    marginHorizontal: 20,
  }, 
  categoryItemTitle: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  categorySelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 26,
    width: 26,
    borderRadius: 26,
  },
  categorySelectIcon: {
    alignSelf: 'center',
  },
  popularWrapper: {
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularCardWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  }, 
  popularTopTxt: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  popularTitleWrapper: {
    marginTop: 20,
  },
  popularTitlesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textDark,
  }, 
  popularTitlesWeight: {
    fontSize: 12,
    opacity: 0.5,
    marginVertical: 5,
  },
  popularCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -20,
  },
  addPizzaBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  rating: {
    fontSize: 12,
    color: Colors.textDark,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  popularCardRight: {
    marginLeft: 20,
  },
  popularCardImg: {
    width: 210,
    height: 125,
    resizeMode: 'contain',
  },
});
