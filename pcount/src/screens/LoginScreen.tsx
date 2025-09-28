import React, { useState } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../theme';
import styled from 'styled-components/native';

interface LoginScreenProps {
  navigation: any;
}

// Styled Components
const CyanBackground = styled.View`
  flex: 1;
  background-color: #00bcd4;
`;

const CurvedOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  margin-top: 140px;
`;

const LoginCard = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing['2xl']}px;
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing['2xl']}px;
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
  max-width: 340px;
  padding: ${theme.spacing['xl']}px 24px;
`;

const InputWrapper = styled.View`
  position: relative;
  margin-bottom: 20px;
`;

const StyledInput = styled.TextInput`
  background-color: #ffffff;
  border-width: 2px;
  border-color: #00bcd4;
  border-radius: 14px;
  padding: 18px 18px 18px 55px;
  font-size: 17px;
  color: #333;
  min-height: 56px;
`;

const InputIconContainer = styled.View`
  position: absolute;
  left: 18px;
  top: 18px;
  z-index: 1;
`;

const EyeIconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 18px;
  top: 18px;
  z-index: 1;
  padding: 4px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #00bcd4;
  border-radius: 14px;
  padding: 18px;
  align-items: center;
  margin-top: 24px;
  min-height: 56px;
  justify-content: center;
  shadow-color: #00bcd4;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

const VersionText = styled.Text`
  position: absolute;
  bottom: 40px;
  align-self: center;
  color: #999;
  font-size: 14px;
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
    <CyanBackground>
      <CurvedOverlay />
      <LoginCard>
        {/* Logo Area */}
        <LogoContainer style={{ marginTop: 40 }}>
          <View style={{ alignItems: 'center', marginBottom: 50 }}>
            {/* Main PCOUNT Logo */}
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: 8
            }}>
              <Text style={{
                fontSize: 52,
                fontWeight: '800',
                color: '#333',
                letterSpacing: 1
              }}>
                PC
              </Text>
              <View style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: '#00bcd4',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4,
                shadowColor: '#00bcd4',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 3
              }}>
                <MaterialIcons name="visibility" size={22} color="white" />
              </View>
              <Text style={{
                fontSize: 52,
                fontWeight: '800',
                color: '#333',
                letterSpacing: 1
              }}>
                UNT
              </Text>
            </View>
            {/* Subtitle */}
            <Text style={{
              fontSize: 16,
              color: '#666',
              fontWeight: '500',
              letterSpacing: 0.5
            }}>
              Sistema de Monitoramento
            </Text>
          </View>
        </LogoContainer>
        
        <FormContainer>
          {/* Form Title */}
          <Text style={{
            fontSize: 19,
            color: '#333',
            textAlign: 'center',
            marginBottom: 32,
            fontWeight: '600',
            lineHeight: 26
          }}>
            Entre com suas credenciais para{'\n'}acessar o sistema.
          </Text>
          
          {/* Email Input */}
          <InputWrapper>
            <View style={{ position: 'relative' }}>
              <InputIconContainer>
                <MaterialIcons name="email" size={26} color="#00bcd4" />
              </InputIconContainer>
              <StyledInput
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#999"
              />
            </View>
          </InputWrapper>
          
          {/* Password Input */}
          <InputWrapper>
            <View style={{ position: 'relative' }}>
              <InputIconContainer>
                <MaterialIcons name="lock" size={26} color="#00bcd4" />
              </InputIconContainer>
              <StyledInput
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#999"
              />
              <EyeIconContainer onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons 
                  name={showPassword ? "visibility" : "visibility-off"} 
                  size={26} 
                  color="#00bcd4" 
                />
              </EyeIconContainer>
            </View>
          </InputWrapper>
          
          {/* Login Button */}
          <LoginButton onPress={handleLogin}>
            <Text style={{
              color: 'white',
              fontSize: 19,
              fontWeight: '700',
              letterSpacing: 0.5
            }}>
              Entrar
            </Text>
          </LoginButton>
        </FormContainer>
        
        {/* Version */}
        <VersionText>v2.0.0</VersionText>
      </LoginCard>
    </CyanBackground>
  );
};