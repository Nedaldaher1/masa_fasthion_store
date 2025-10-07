// app/(tabs)/cart.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/CustomText';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'expo-router';

const CartScreen = () => {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCartStore();

  const totalPrice = getTotalPrice();
  const discount = totalPrice * 0.1; // خصم 10%
  const deliveryFees = 0; // توصيل مجاني
  const finalTotal = totalPrice - discount + deliveryFees;

  const handleRemoveItem = (itemId: string, itemName: string) => {
    Alert.alert(
      'إزالة المنتج',
      `هل تريد إزالة ${itemName} من السلة؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'إزالة',
          style: 'destructive',
          onPress: () => removeItem(itemId),
        },
      ]
    );
  };

  const handleIncreaseQuantity = (itemId: string, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('السلة فارغة', 'الرجاء إضافة منتجات إلى السلة أولاً');
      return;
    }
    Alert.alert('الدفع', 'سيتم توجيهك إلى صفحة الدفع', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'متابعة', onPress: () => console.log('Checkout') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <CustomText style={styles.headerTitle}>السلة</CustomText>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#D1D5DB" />
          <CustomText style={styles.emptyTitle}>السلة فارغة</CustomText>
          <CustomText style={styles.emptySubtitle}>
            لم تقم بإضافة أي منتجات بعد
          </CustomText>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push('/(tabs)')}
          >
            <CustomText style={styles.shopButtonText}>تسوق الآن</CustomText>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            {/* عدد المنتجات */}
            <CustomText style={styles.itemsCount}>
              لديك {getTotalItems()} منتجات في سلتك
            </CustomText>

            {/* قائمة المنتجات */}
            {items.map((item, index) => (
              <View key={`${item.id}-${item.color}-${item.size}-${index}`} style={styles.cartItem}>
                <View style={styles.itemContent}>
                  {/* صورة المنتج */}
                  <Image source={{ uri: item.image }} style={styles.itemImage} />

                  {/* معلومات المنتج */}
                  <View style={styles.itemDetails}>
                    <View style={styles.itemHeader}>
                      <CustomText style={styles.itemName} numberOfLines={2}>
                        {item.name}
                      </CustomText>
                      <TouchableOpacity
                        onPress={() => handleRemoveItem(item.id, item.name)}
                        style={styles.removeButton}
                      >
                        <Ionicons name="close" size={20} color="#000" />
                      </TouchableOpacity>
                    </View>

                    {/* اللون والمقاس */}
                    <View style={styles.attributesRow}>
                      <View style={styles.attribute}>
                        <CustomText style={styles.attributeLabel}>اللون:</CustomText>
                        <View
                          style={[
                            styles.colorCircle,
                            { backgroundColor: item.color || '#000' },
                          ]}
                        />
                      </View>

                      <View style={styles.attribute}>
                        <CustomText style={styles.attributeLabel}>المقاس:</CustomText>
                        <CustomText style={styles.attributeValue}>
                          {item.size || 'M'}
                        </CustomText>
                      </View>
                    </View>

                    {/* السعر والكمية */}
                    <View style={styles.priceQuantityRow}>
                      <View style={styles.priceContainer}>
                        <CustomText style={styles.oldPrice}>
                          {(item.price * 1.2).toFixed(2)}$
                        </CustomText>
                        <CustomText style={styles.currentPrice}>
                          {item.price.toFixed(2)}$
                        </CustomText>
                      </View>

                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => handleDecreaseQuantity(item.id, item.quantity)}
                        >
                          <Ionicons name="remove" size={18} color="#000" />
                        </TouchableOpacity>
                        <CustomText style={styles.quantityText}>
                          {item.quantity}
                        </CustomText>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => handleIncreaseQuantity(item.id, item.quantity)}
                        >
                          <Ionicons name="add" size={18} color="#000" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            {/* ملخص الطلب */}
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <CustomText style={styles.summaryValue}>
                  {totalPrice.toFixed(2)}$
                </CustomText>
                <CustomText style={styles.summaryLabel}>السعر الإجمالي</CustomText>
              </View>

              <View style={styles.summaryRow}>
                <CustomText style={styles.summaryValue}>
                  {discount.toFixed(2)}$
                </CustomText>
                <CustomText style={styles.summaryLabel}>الخصم</CustomText>
              </View>

              <View style={styles.summaryRow}>
                <CustomText style={styles.summaryValue}>مجاني</CustomText>
                <CustomText style={styles.summaryLabel}>رسوم التوصيل</CustomText>
              </View>

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <CustomText style={styles.totalValue}>
                  {finalTotal.toFixed(2)}$
                </CustomText>
                <CustomText style={styles.totalLabel}>الإجمالي:</CustomText>
              </View>

              <View style={styles.savingRow}>
                <CustomText style={styles.savingValue}>
                  {discount.toFixed(2)}$
                </CustomText>
                <CustomText style={styles.savingLabel}>تم تطبيق التوفير</CustomText>
              </View>
            </View>

            <View style={styles.bottomPadding} />
          </ScrollView>

          {/* زر الدفع */}
          <View style={styles.checkoutContainer}>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Ionicons name="cart-outline" size={20} color="#FFF" />
              <CustomText style={styles.checkoutText}>الدفع</CustomText>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  content: {
    flex: 1,
  },
  itemsCount: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 16,
  },
  cartItem: {
    backgroundColor: '#F9FAFB',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
  },
  itemContent: {
    flexDirection: 'row',
    gap: 12,
  },
  itemImage: {
    width: 100,
    height: 130,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginLeft: 8,
    textAlign: 'left',
  },
  removeButton: {
    padding: 4,
  },
  attributesRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 12,
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  attributeLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  attributeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  priceQuantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E74C3C',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 12,
  },
  summaryContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    paddingTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  summaryValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  savingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  savingValue: {
    fontSize: 13,
    color: '#2ECC71',
  },
  checkoutContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  checkoutButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  bottomPadding: {
    height: 20,
  },
});

export default CartScreen;