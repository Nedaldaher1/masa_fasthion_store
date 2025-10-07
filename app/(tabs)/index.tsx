// app/(tabs)/index.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
  Animated,
  Keyboard,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/CustomText';
import { Link } from 'expo-router';
import { useWishlistStore } from '@/store/wishlistStore';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 48) / 2;

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchAnimation = useRef(new Animated.Value(0)).current;

  // استخدام Wishlist Store
  const { isInWishlist, toggleItem } = useWishlistStore();

  const topCategories = [
    { id: 1, name: 'قمصان' },
    { id: 2, name: 'فساتين' },
    { id: 3, name: 'بدلات' },
    { id: 4, name: 'حقائب' },
  ];

  const categories = ['الكل', 'فساتين', 'سترات', 'معاطف', 'قمصان'];

  const products = [
    { 
      id: '1', 
      name: 'فستان صيفي أنيق', 
      price: 79.95, 
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop'
    },
    { 
      id: '2', 
      name: 'قميص أبيض كلاسيكي', 
      price: 59.95, 
      image: 'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=400&h=600&fit=crop'
    },
    { 
      id: '3', 
      name: 'جاكيت جلد عصري', 
      price: 119.00, 
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop'
    },
    { 
      id: '4', 
      name: 'فستان أسود أنيق', 
      price: 89.95, 
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=600&fit=crop'
    },
    { 
      id: '5', 
      name: 'بنطال جينز عصري', 
      price: 69.95, 
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop'
    },
    { 
      id: '6', 
      name: 'تنورة قصيرة', 
      price: 55.00, 
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=600&fit=crop'
    },
    { 
      id: '7', 
      name: 'بلوزة وردية', 
      price: 59.95, 
      image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f4?w=400&h=600&fit=crop'
    },
    { 
      id: '8', 
      name: 'معطف شتوي', 
      price: 139.00, 
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=600&fit=crop'
    },
  ];

  const handleToggleFavorite = (product: any) => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const toggleSearch = () => {
    if (searchVisible) {
      // إخفاء البحث
      Animated.timing(searchAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setSearchVisible(false);
        setSearchQuery('');
        Keyboard.dismiss();
      });
    } else {
      // إظهار البحث
      setSearchVisible(true);
      Animated.timing(searchAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const searchBarHeight = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60],
  });

  const searchBarOpacity = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // فلترة المنتجات حسب البحث
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <CustomText style={styles.headerTitle}>ماسة فيشن</CustomText>
        <TouchableOpacity onPress={toggleSearch}>
          <Ionicons 
            name={searchVisible ? 'close' : 'search-outline'} 
            size={24} 
            color="#000" 
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      {searchVisible && (
        <Animated.View
          style={[
            styles.searchContainer,
            {
              height: searchBarHeight,
              opacity: searchBarOpacity,
            },
          ]}
        >
          <View style={styles.searchInputWrapper}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="ابحث عن المنتجات..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
              textAlign="right"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* إظهار نتائج البحث إذا كان هناك بحث */}
        {searchQuery.length > 0 ? (
          <View style={styles.searchResultsContainer}>
            <CustomText style={styles.searchResultsTitle}>
              نتائج البحث ({filteredProducts.length})
            </CustomText>
            <View style={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={{
                    pathname: '/product/[id]',
                    params: {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    }
                  }}
                  asChild
                >
                  <TouchableOpacity style={styles.productCard}>
                    <View style={styles.productImageContainer}>
                      <Image 
                        source={{ uri: product.image }} 
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(product);
                        }}
                      >
                        <Ionicons
                          name={isInWishlist(product.id) ? 'heart' : 'heart-outline'}
                          size={20}
                          color={isInWishlist(product.id) ? '#EF4444' : '#000'}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.productInfo}>
                      <CustomText style={styles.productPrice}>{product.price.toFixed(2)} ريال</CustomText>
                      <CustomText style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
            {filteredProducts.length === 0 && (
              <View style={styles.noResults}>
                <Ionicons name="sad-outline" size={60} color="#D1D5DB" />
                <CustomText style={styles.noResultsText}>لا توجد نتائج</CustomText>
              </View>
            )}
          </View>
        ) : (
          <>
            {/* Top Categories Carousel */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.topCategoriesContainer}
              contentContainerStyle={styles.topCategoriesContent}
            >
              {topCategories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.topCategoryCard}>
                  <View style={styles.categoryImagePlaceholder}>
                    <Ionicons name="shirt-outline" size={40} color="#666" />
                  </View>
                  <CustomText style={styles.topCategoryText}>{category.name}</CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Brand New Collection Banner */}
            <View style={styles.banner}>
              <View style={styles.bannerContent}>
                <View style={styles.bannerLeft}>
                  <CustomText style={styles.bannerTitle}>مجموعة</CustomText>
                  <CustomText style={styles.bannerTitle}>جديدة تماماً</CustomText>
                </View>
                <View style={styles.bannerImageContainer}>
                  <View style={styles.bannerImagePlaceholder}>
                    <Ionicons name="person-outline" size={80} color="#9CA3AF" />
                  </View>
                </View>
              </View>
            </View>

            {/* Categories Tabs */}
            <View style={styles.categoriesSection}>
              <CustomText style={styles.sectionTitle}>التصنيفات</CustomText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesTabsContainer}
              >
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedCategory(category)}
                    style={styles.categoryTab}
                  >
                    <CustomText
                      style={[
                        styles.categoryTabText,
                        selectedCategory === category && styles.categoryTabTextActive,
                      ]}
                    >
                      {category}
                    </CustomText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Products Grid */}
            <View style={styles.productsGrid}>
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={{
                    pathname: '/product/[id]',
                    params: {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    }
                  }}
                  asChild
                >
                  <TouchableOpacity style={styles.productCard}>
                    <View style={styles.productImageContainer}>
                      <Image 
                        source={{ uri: product.image }} 
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(product);
                        }}
                      >
                        <Ionicons
                          name={isInWishlist(product.id) ? 'heart' : 'heart-outline'}
                          size={20}
                          color={isInWishlist(product.id) ? '#EF4444' : '#000'}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.productInfo}>
                      <CustomText style={styles.productPrice}>{product.price.toFixed(2)} ريال</CustomText>
                      <CustomText style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          </>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    overflow: 'hidden',
  },
  searchInputWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    textAlign: 'right',
  },
  searchResultsContainer: {
    paddingTop: 16,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
    paddingHorizontal: 16,
    textAlign: 'right',
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 16,
  },
  topCategoriesContainer: {
    marginTop: 8,
  },
  topCategoriesContent: {
    paddingHorizontal: 16,
    gap: 12,
    flexDirection: 'row-reverse',
  },
  topCategoryCard: {
    width: 90,
    marginLeft: 12,
  },
  categoryImagePlaceholder: {
    width: 90,
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCategoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginTop: 8,
    textAlign: 'center',
  },
  banner: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#4B5563',
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
  },
  bannerContent: {
    flexDirection: 'row-reverse',
    height: '100%',
  },
  bannerLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 24,
    alignItems: 'flex-end',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 30,
    textAlign: 'right',
  },
  bannerImageContainer: {
    width: 140,
    height: '100%',
    backgroundColor: '#9CA3AF',
    borderTopRightRadius: 70,
    borderBottomRightRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'right',
  },
  categoriesTabsContainer: {
    marginTop: 8,
    flexDirection: 'row-reverse',
  },
  categoryTab: {
    marginLeft: 20,
    paddingVertical: 4,
  },
  categoryTabText: {
    fontSize: 15,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: '#000000',
    fontWeight: '700',
  },
  productsGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 20,
    gap: 16,
  },
  productCard: {
    width: PRODUCT_WIDTH,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
    textAlign: 'right',
  },
  bottomPadding: {
    height: 120,
  },
});

export default HomeScreen;