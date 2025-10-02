import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, useWindowDimensions, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

interface AppHeaderProps {
  onLogout: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onLogout }) => {
  const { width: screenWidth } = useWindowDimensions();
  
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={{
        paddingTop: 50,
        paddingBottom: 12,
        paddingHorizontal: theme.spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 10
      }}
      resizeMode="cover"
    >
      {/* Logo VITON */}
      <View style={{
        backgroundColor: '#fbbf24',
        borderRadius: theme.borderRadius.lg,
        width: 52,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4
      }}>
        <Text style={{ 
          fontSize: 10, 
          fontWeight: '900', 
          color: '#000',
          letterSpacing: 0.5
        }}>VITON</Text>
      </View>
      
      {/* Logo PCOUNT */}
      <View style={{ 
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1
      }}>
        <Image
          source={require('../../assets/pcount-logo.png')}
          style={{
            width: 100,
            height: 42,
            resizeMode: 'contain'
          }}
        />
      </View>
      
      {/* Botão Logout */}
      <TouchableOpacity
        onPress={onLogout}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: theme.borderRadius.lg,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 4
        }}
      >
        <MaterialIcons name="power-settings-new" size={20} color="rgba(255, 255, 255, 0.95)" />
      </TouchableOpacity>
    </ImageBackground>
  );
};
