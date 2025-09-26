import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  CenteredContainer,
  Logo,
  Input,
  Button,
  ButtonText,
} from '../components/StyledComponents';
import { theme } from '../theme';
import styled from 'styled-components/native';

interface LoginScreenProps {
  navigation: any;
}

// Styled Components
const GradientBackground = styled(LinearGradient)`
  flex: 1;
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
  opacity: 0.9;
`;

const FormContainer = styled.View`
  width: 100%;
  max-width: 400px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius['3xl']}px;
  padding: ${theme.spacing['2xl']}px;
  shadow-color: ${theme.colors.shadow};
  shadow-offset: 0px 10px;
  shadow-opacity: 0.3;
  shadow-radius: 20px;
  elevation: 15;
`;

const InputWrapper = styled.View`
  position: relative;
  margin-bottom: ${theme.spacing.md}px;
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
  line-height: 18px;
`;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <GradientBackground
      colors={[theme.colors.primary, theme.colors.accent, theme.colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <LoginCard>
        <LogoContainer>
          <Logo style={{ color: theme.colors.textInverse }}>PCOUNT</Logo>
          <SubTitle>Sistema de Monitoramento</SubTitle>
        </LogoContainer>
        
        <FormContainer>
          <InputWrapper>
            <Input
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </InputWrapper>
          
          <InputWrapper>
            <Input
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </InputWrapper>
          
          <Button onPress={handleLogin}>
            <ButtonText>Entrar no Sistema</ButtonText>
          </Button>
          
          <WelcomeText>
            Conecte-se para monitorar suas linhas de produção em tempo real
          </WelcomeText>
        </FormContainer>
      </LoginCard>
    </GradientBackground>
  );
};