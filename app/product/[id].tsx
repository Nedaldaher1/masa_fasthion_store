// app/product/[id].tsx
import { View, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import CustomText from '@/components/CustomText';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const { id, name, price, image } = useLocalSearchParams();
  const router = useRouter();
  
  const [selectedColor, setSelectedColor] = useState('#3D2314');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  // استخدام المخازن
  const addToCart = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();
  
  const isFavorite = isInWishlist(id as string);

  const colors = ['#3D2314', '#D4AF37', '#FFFFFF'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'المزيد..'];

  const similarProducts = [
    { id: '1', name: 'فستان قصير بأكمام منفوخة', price: '79.95', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=300&fit=crop' },
    { id: '2', name: 'فستان ماري الأبيض', price: '89.00', oldPrice: '89.95', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200&h=300&fit=crop' },
  ];

  const recommendedProducts = [
    { id: '3', name: 'فستان بكتف واحد وكشكش', price: '69.95', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=300&fit=crop' },
    { id: '4', name: 'بنطلون برتقالي واسع', price: '69.95', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=300&fit=crop' },
  ];

  const handleToggleFavorite = () => {
    toggleItem({
      id: id as string,
      name: name as string,
      price: parseFloat(price as string),
      image: image as string,
    });
    
    if (!isFavorite) {
      Alert.alert('تمت الإضافة', 'تم إضافة المنتج إلى المفضلة');
    } else {
      Alert.alert('تم الإزالة', 'تم إزالة المنتج من المفضلة');
    }
  };

 // app/product/[id].tsx
const handleAddToCart = () => {
  // إضافة المنتج إلى السلة مع الكمية المحددة
  for (let i = 0; i < quantity; i++) {
    addToCart({
      id: id as string,
      name: name as string,
      price: parseFloat(price as string),
      image: image as string,
      color: selectedColor,
      size: selectedSize,
    });
  }
  
  Alert.alert(
    'تمت الإضافة', 
    `تم إضافة ${quantity} من ${name} إلى السلة`,
    [
      { text: 'متابعة التسوق', style: 'cancel' },
      { text: 'عرض السلة', onPress: () => router.push('/(tabs)/cart') }
    ]
  );
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="share-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* صورة المنتج */}
        <Image 
          source={{ uri: image as string || 'https://via.placeholder.com/400' }} 
          style={styles.productImage}
        />

        {/* معلومات المنتج */}
        <View style={styles.contentContainer}>
          {/* الاسم والمفضلة */}
          <View style={styles.nameRow}>
            <TouchableOpacity onPress={handleToggleFavorite}>
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={24} 
                color={isFavorite ? "#E74C3C" : "#000"} 
              />
            </TouchableOpacity>
            <CustomText style={styles.productName}>
              {name || 'فستان قميص كورسيه كلوديت باللون الأبيض'}
            </CustomText>
          </View>

          {/* التقييم والسعر */}
          <View style={styles.ratingPriceRow}>
            <View style={styles.priceContainer}>
              <CustomText style={styles.oldPrice}>
                {(parseFloat(price as string) * 1.2).toFixed(2)}$
              </CustomText>
              <CustomText style={styles.price}>{price}$</CustomText>
            </View>
            <View style={styles.ratingContainer}>
              <CustomText style={styles.ratingText}>5.0</CustomText>
              {[...Array(5)].map((_, i) => (
                <Ionicons key={i} name="star" size={14} color="#FFA500" />
              ))}
            </View>
          </View>

          {/* اختيار اللون */}
          <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>اللون</CustomText>
            <View style={styles.colorsContainer}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    color === '#FFFFFF' && styles.whiteColorBorder,
                    selectedColor === color && styles.selectedColor
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <Ionicons 
                      name="checkmark" 
                      size={16} 
                      color={color === '#FFFFFF' ? '#000' : '#FFF'} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* اختيار المقاس */}
          <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>المقاس</CustomText>
            <View style={styles.sizesContainer}>
              {sizes.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.selectedSize
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <CustomText style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText
                  ]}>
                    {size}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity>
              <CustomText style={styles.sizeGuide}>دليل المقاسات</CustomText>
            </TouchableOpacity>
          </View>

          {/* الكمية وزر الإضافة */}
          <View style={styles.cartSection}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove" size={20} color="#000" />
              </TouchableOpacity>
              <CustomText style={styles.quantityText}>{quantity}</CustomText>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Ionicons name="cart-outline" size={20} color="#FFF" />
              <CustomText style={styles.addToCartText}>أضف إلى السلة</CustomText>
            </TouchableOpacity>
          </View>

          {/* الوصف */}
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.sectionHeader}
              onPress={() => setShowDescription(!showDescription)}
            >
              <Ionicons 
                name={showDescription ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#000" 
              />
              <CustomText style={styles.sectionHeaderTitle}>الوصف</CustomText>
            </TouchableOpacity>
            {showDescription && (
              <View style={styles.descriptionContent}>
                <CustomText style={styles.descriptionText}>
                  القميص هو استثمار مربح في خزانة الملابس. وإليك السبب:
                </CustomText>
                <CustomText style={styles.descriptionText}>
                  - القمصان تتناسب تمامًا مع أي قطعة سفلية
                </CustomText>
                <CustomText style={styles.descriptionText}>
                  - القمصان المصنوعة من الأقمشة الطبيعية مناسبة لأي وقت من السنة
                </CustomText>
              </View>
            )}
          </View>

          {/* مراجعات العملاء */}
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.sectionHeader}
              onPress={() => setShowReviews(!showReviews)}
            >
              <Ionicons 
                name={showReviews ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#000" 
              />
              <CustomText style={styles.sectionHeaderTitle}>مراجعات العملاء</CustomText>
            </TouchableOpacity>
            {showReviews && (
              <View style={styles.reviewsContent}>
                <CustomText style={styles.descriptionText}>
                  لا توجد مراجعات بعد
                </CustomText>
              </View>
            )}
          </View>

          {/* منتجات مشابهة */}
          <View style={styles.section}>
            <CustomText style={styles.sectionHeaderTitle}>منتجات مشابهة</CustomText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarProducts.map((product) => (
                <TouchableOpacity key={product.id} style={styles.productCard}>
                  <Image 
                    source={{ uri: product.image }} 
                    style={styles.productCardImage}
                  />
                  <View style={styles.productCardInfo}>
                    <View style={styles.productCardPriceRow}>
                      <TouchableOpacity>
                        <Ionicons name="heart-outline" size={20} color="#000" />
                      </TouchableOpacity>
                      <CustomText style={styles.productCardPrice}>
                        {product.price}$
                      </CustomText>
                    </View>
                    <CustomText style={styles.productCardName} numberOfLines={2}>
                      {product.name}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* نعتقد أنك ستحب */}
          <View style={styles.section}>
            <CustomText style={styles.sectionHeaderTitle}>نعتقد أنك ستحب</CustomText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recommendedProducts.map((product) => (
                <TouchableOpacity key={product.id} style={styles.productCard}>
                  <Image 
                    source={{ uri: product.image }} 
                    style={styles.productCardImage}
                  />
                  <View style={styles.productCardInfo}>
                    <View style={styles.productCardPriceRow}>
                      <TouchableOpacity>
                        <Ionicons name="heart-outline" size={20} color="#000" />
                      </TouchableOpacity>
                      <CustomText style={styles.productCardPrice}>
                        {product.price}$
                      </CustomText>
                    </View>
                    <CustomText style={styles.productCardName} numberOfLines={2}>
                      {product.name}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: width,
    height: width * 1.2,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginLeft: 10,
    textAlign: 'right',
  },
  ratingPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  oldPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'right',
  },
  colorsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteColorBorder: {
    borderWidth: 1,
    borderColor: '#DDD',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-end',
  },
  sizeOption: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#F5F5F5',
  },
  selectedSize: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  sizeText: {
    fontSize: 14,
    color: '#000',
  },
  selectedSizeText: {
    color: '#FFF',
  },
  sizeGuide: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  cartSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 25,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 15,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    gap: 8,
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  descriptionContent: {
    gap: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    textAlign: 'right',
  },
  reviewsContent: {
    paddingVertical: 10,
  },
  productCard: {
    width: 140,
    marginLeft: 12,
  },
  productCardImage: {
    width: 140,
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
  },
  productCardInfo: {
    gap: 4,
  },
  productCardPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCardPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  productCardName: {
    fontSize: 13,
    color: '#666',
    textAlign: 'right',
  },
});