import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, useWindowDimensions } from 'react-native';
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
        paddingBottom: 24,
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
        borderRadius: theme.borderRadius.xl,
        width: 58,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5
      }}>
        <Text style={{ 
          fontSize: theme.fontSizes.xs, 
          fontWeight: '900', 
          color: '#000',
          letterSpacing: 0.8
        }}>VITON</Text>
      </View>
      
      {/* Logo PCOUNT com design da tela de login */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1
      }}>
        <Text style={{
          fontSize: Math.min(screenWidth * 0.08, 32),
          fontWeight: '800',
          color: 'rgba(255, 255, 255, 0.95)',
          letterSpacing: 1,
          textShadowColor: 'rgba(0, 0, 0, 0.2)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 4
        }}>
          PC
        </Text>
        <View style={{
          width: Math.max(screenWidth * 0.06, 24),
          height: Math.max(screenWidth * 0.06, 24),
          borderRadius: Math.max(screenWidth * 0.03, 12),
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: screenWidth * 0.01,
          elevation: 6
        }}>
          <MaterialIcons name="visibility" size={Math.max(screenWidth * 0.03, 12)} color="#667eea" />
        </View>
        <Text style={{
          fontSize: Math.min(screenWidth * 0.08, 32),
          fontWeight: '800',
          color: 'rgba(255, 255, 255, 0.95)',
          letterSpacing: 1,
          textShadowColor: 'rgba(0, 0, 0, 0.2)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 4
        }}>
          UNT
        </Text>
      </View>
      
      {/* Botão Logout */}
      <TouchableOpacity
        onPress={onLogout}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: theme.borderRadius.xl,
          width: 44,
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5
        }}
      >
        <MaterialIcons name="power-settings-new" size={22} color="rgba(255, 255, 255, 0.95)" />
      </TouchableOpacity>
    </ImageBackground>
  );
};
