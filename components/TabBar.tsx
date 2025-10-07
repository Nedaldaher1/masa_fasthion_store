import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TabBarProps {
  onTabChange?: (tabId: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [cartBadge] = useState(3);

  const tabs = [
    { id: 'home', icon: 'home-outline', activeIcon: 'home', label: 'الرئيسية' },
    { id: 'menu', icon: 'menu-outline', activeIcon: 'menu', label: 'القائمة' },
    { id: 'cart', icon: 'cart-outline', activeIcon: 'cart', label: 'السلة', badge: cartBadge },
    { id: 'favorite', icon: 'heart-outline', activeIcon: 'heart', label: 'المفضلة' },
    { id: 'profile', icon: 'person-outline', activeIcon: 'person', label: 'الملف الشخصي' }
  ];

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    onTabChange?.(tabs[index].id);
  };

  return (
    <View style={styles.tabs}>
      {/* Active Tab Indicator */}
      <View style={styles.indicatorWrapper}>
        <View 
          style={[
            styles.activeIndicator,
            { transform: [{ translateX: activeTab * 60 }] }
          ]} 
        />
      </View>
      
      {/* Tabs Container */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => handleTabPress(index)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={isActive ? tab.activeIcon as any : tab.icon as any}
                  size={24}
                  color={isActive ? '#000000' : '#666666'}
                />
                
                {/* Badge for Cart */}
                {tab.badge && tab.badge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{tab.badge}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    width: 375,
    height: 98,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  indicatorWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  activeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#000000',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default TabBar;
