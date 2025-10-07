// app/(tabs)/favorite.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/CustomText';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { Link, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 48) / 2;

const FavoriteScreen = () => {
  const router = useRouter();
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    Alert.alert(
      'تمت الإضافة',
      `تم إضافة ${product.name} إلى السلة`,
      [
        { text: 'متابعة التسوق', style: 'cancel' },
        { text: 'عرض السلة', onPress: () => router.push('/(tabs)/cart') }
      ]
    );
  };

  const handleRemoveFavorite = (productId: string) => {
    Alert.alert(
      'إزالة من المفضلة',
      'هل تريد إزالة هذا المنتج من المفضلة؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'إزالة', 
          style: 'destructive',
          onPress: () => removeItem(productId)
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <CustomText style={styles.headerTitle}>المفضلات</CustomText>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={80} color="#D1D5DB" />
            <CustomText style={styles.emptyTitle}>لا توجد منتجات في المفضلة</CustomText>
            <CustomText style={styles.emptySubtitle}>
              ابدأ بإضافة منتجاتك المفضلة هنا
            </CustomText>
            <TouchableOpacity 
              style={styles.shopButton}
              onPress={() => router.push('/(tabs)')}
            >
              <CustomText style={styles.shopButtonText}>تسوق الآن</CustomText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.productsGrid}>
            {items.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <Link
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
                  <TouchableOpacity>
                    <View style={styles.imageContainer}>
                      <Image 
                        source={{ uri: product.image }} 
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => handleRemoveFavorite(product.id)}
                      >
                        <Ionicons name="heart" size={20} color="#E74C3C" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Link>

                <View style={styles.productInfo}>
                  <View style={styles.priceRow}>
                    <CustomText style={styles.price}>
                      {product.price.toFixed(2)}$
                    </CustomText>
                  </View>
                  
                  <CustomText style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </CustomText>

                  <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(product)}
                  >
                    <Ionicons name="cart-outline" size={18} color="#FFF" />
                    <CustomText style={styles.addToCartText}>أضف للسلة</CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
  shopButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 16,
  },
  productCard: {
    width: PRODUCT_WIDTH,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
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
    gap: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  productName: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    textAlign: 'left',
    minHeight: 36,
  },
  addToCartButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
    marginTop: 4,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});

export default FavoriteScreen;