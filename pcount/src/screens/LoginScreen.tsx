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
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  margin-top: 120px;
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
  max-width: 320px;
  padding: ${theme.spacing['xl']}px;
`;

const InputWrapper = styled.View`
  position: relative;
  margin-bottom: ${theme.spacing.lg}px;
`;

const StyledInput = styled.TextInput`
  background-color: #ffffff;
  border-width: 2px;
  border-color: #00bcd4;
  border-radius: 12px;
  padding: 16px 16px 16px 50px;
  font-size: 16px;
  color: #333;
`;

const InputIconContainer = styled.View`
  position: absolute;
  left: 16px;
  top: 16px;
  z-index: 1;
`;

const EyeIconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 1;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #00bcd4;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  margin-top: ${theme.spacing.lg}px;
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
        <LogoContainer style={{ marginTop: 60 }}>
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Text style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: '#333',
                letterSpacing: 2
              }}>
                PC
              </Text>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#00bcd4',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 2
              }}>
                <MaterialIcons name="visibility" size={20} color="white" />
              </View>
              <Text style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: '#333',
                letterSpacing: 2
              }}>
                UNT
              </Text>
            </View>
          </View>
        </LogoContainer>
        
        <FormContainer>
          {/* Form Title */}
          <Text style={{
            fontSize: 18,
            color: '#333',
            textAlign: 'center',
            marginBottom: 40,
            fontWeight: '500'
          }}>
            Entre com suas credenciais para{'\n'}acessar o sistema.
          </Text>
          
          {/* Email Input */}
          <InputWrapper>
            <View style={{ position: 'relative' }}>
              <InputIconContainer>
                <MaterialIcons name="email" size={24} color="#00bcd4" />
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
                <MaterialIcons name="lock" size={24} color="#00bcd4" />
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
                  size={24} 
                  color="#00bcd4" 
                />
              </EyeIconContainer>
            </View>
          </InputWrapper>
          
          {/* Login Button */}
          <LoginButton onPress={handleLogin}>
            <Text style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '600'
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