import React, { useState } from 'react';
import { Alert, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../theme';
import styled from 'styled-components/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface LoginScreenProps {
  navigation: any;
}

// Styled Components
const GradientBackground = styled.View`
  flex: 1;
`;

const CurvedOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.95);
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  margin-top: ${screenHeight * 0.18}px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 8;
`;

const LoginCard = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${screenWidth * 0.08}px;
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: ${screenHeight * 0.04}px;
`;

const SubTitle = styled.Text`
  font-size: ${theme.fontSizes.lg}px;
  color: ${theme.colors.textInverse};
  text-align: center;
  margin-top: ${theme.spacing.sm}px;
  font-weight: 500;
  opacity: 0.95;
  letter-spacing: 0.5px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const FormContainer = styled.View`
  width: 100%;
  max-width: ${screenWidth * 0.9}px;
  padding: ${screenHeight * 0.03}px ${screenWidth * 0.06}px;
`;

const InputWrapper = styled.View`
  position: relative;
  margin-bottom: ${screenHeight * 0.024}px;
`;

const StyledInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.9);
  border-width: 1.5px;
  border-color: #e0e0e0;
  border-radius: 16px;
  padding: ${screenHeight * 0.022}px ${screenWidth * 0.04}px ${screenHeight * 0.022}px ${screenWidth * 0.14}px;
  font-size: ${screenWidth * 0.045}px;
  color: #2c3e50;
  min-height: ${screenHeight * 0.065}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
  font-weight: 500;
`;

const InputIconContainer = styled.View`
  position: absolute;
  left: ${screenWidth * 0.045}px;
  top: ${screenHeight * 0.022}px;
  z-index: 1;
`;

const EyeIconContainer = styled.TouchableOpacity`
  position: absolute;
  right: ${screenWidth * 0.045}px;
  top: ${screenHeight * 0.018}px;
  z-index: 1;
  padding: ${screenWidth * 0.02}px;
  border-radius: 20px;
`;

const LoginButton = styled.TouchableOpacity`
  border-radius: 16px;
  padding: ${screenHeight * 0.02}px;
  align-items: center;
  margin-top: ${screenHeight * 0.03}px;
  min-height: ${screenHeight * 0.065}px;
  justify-content: center;
  shadow-color: #667eea;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.25;
  shadow-radius: 12px;
  elevation: 6;
`;

const VersionText = styled.Text`
  position: absolute;
  bottom: ${screenHeight * 0.05}px;
  align-self: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: ${screenWidth * 0.035}px;
  font-weight: 500;
`;

const InputIcon = styled.Text`
  position: absolute;
  left: ${theme.spacing.lg}px;
  top: 50%;
  transform: translateY(-12px);
  font-size: 20px;
  z-index: 1;
`;

const WelcomeText = styled.Text`
  font-size: ${theme.fontSizes.xs}px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-top: ${theme.spacing.lg}px;
  line-height: 20px;
  font-weight: 500;
  opacity: 0.8;
`;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      Alert.alert('Erro', 'Credenciais inválidas');
    }
    // Removido navigation.navigate - deixa o AppNavigator controlar automaticamente
  };

  return (
    <GradientBackground>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
      <CurvedOverlay />
      <LoginCard>
        {/* Logo Area */}
        <LogoContainer style={{ marginTop: screenHeight * 0.05 }}>
          <View style={{ alignItems: 'center', marginBottom: screenHeight * 0.06 }}>
            {/* Main PCOUNT Logo */}
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: 8
            }}>
              <Text style={{
                fontSize: screenWidth * 0.14,
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
                width: screenWidth * 0.12,
                height: screenWidth * 0.12,
                borderRadius: screenWidth * 0.06,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: screenWidth * 0.01,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 6
              }}>
                <MaterialIcons name="visibility" size={screenWidth * 0.06} color="#667eea" />
              </View>
              <Text style={{
                fontSize: screenWidth * 0.14,
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
            {/* Subtitle */}
            <Text style={{
              fontSize: screenWidth * 0.042,
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '500',
              letterSpacing: 0.5,
              textShadowColor: 'rgba(0, 0, 0, 0.1)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2
            }}>
              Sistema de Monitoramento
            </Text>
          </View>
        </LogoContainer>
        
        <FormContainer>
          {/* Form Title */}
          <Text style={{
            fontSize: screenWidth * 0.05,
            color: '#2c3e50',
            textAlign: 'center',
            marginBottom: screenHeight * 0.04,
            fontWeight: '600',
            lineHeight: screenWidth * 0.065
          }}>
            Entre com suas credenciais para{'\n'}acessar o sistema.
          </Text>
          
          {/* Email Input */}
          <InputWrapper>
            <View style={{ position: 'relative' }}>
              <InputIconContainer>
                <MaterialIcons name="email" size={screenWidth * 0.065} color="#667eea" />
              </InputIconContainer>
              <StyledInput
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#a0a0a0"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                style={emailFocused ? {
                  borderColor: '#667eea',
                  borderWidth: 2,
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  shadowOpacity: 0.1
                } : {}}
              />
            </View>
          </InputWrapper>
          
          {/* Password Input */}
          <InputWrapper>
            <View style={{ position: 'relative' }}>
              <InputIconContainer>
                <MaterialIcons name="lock" size={screenWidth * 0.065} color="#667eea" />
              </InputIconContainer>
              <StyledInput
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#a0a0a0"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                style={passwordFocused ? {
                  borderColor: '#667eea',
                  borderWidth: 2,
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  shadowOpacity: 0.1
                } : {}}
              />
              <EyeIconContainer onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons 
                  name={showPassword ? "visibility" : "visibility-off"} 
                  size={screenWidth * 0.065} 
                  color="#667eea" 
                />
              </EyeIconContainer>
            </View>
          </InputWrapper>
          
          {/* Login Button */}
          <LoginButton onPress={handleLogin}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flex: 1,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: screenWidth * 0.05,
                fontWeight: '700',
                letterSpacing: 0.5
              }}>
                Entrar
              </Text>
            </LinearGradient>
          </LoginButton>
        </FormContainer>
        
        {/* Version */}
        <VersionText>v2.0.0</VersionText>
      </LoginCard>
      </LinearGradient>
    </GradientBackground>
  );
};