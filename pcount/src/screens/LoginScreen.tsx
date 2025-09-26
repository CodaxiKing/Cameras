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
  opacity: 0.95;
  letter-spacing: 0.5px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const FormContainer = styled.View`
  width: 100%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: ${theme.borderRadius['3xl']}px;
  padding: ${theme.spacing['2xl']}px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 8px;
  shadow-opacity: 0.15;
  shadow-radius: 32px;
  elevation: 8;
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
  line-height: 20px;
  font-weight: 500;
  opacity: 0.8;
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
      colors={['#667eea', '#764ba2', '#f093fb', '#f5576c']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Elementos decorativos de fundo */}
      <View style={{
        position: 'absolute',
        top: 50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        opacity: 0.7
      }} />
      <View style={{
        position: 'absolute',
        bottom: 100,
        left: -80,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        opacity: 0.5
      }} />
      <View style={{
        position: 'absolute',
        top: '30%',
        left: '80%',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        opacity: 0.6
      }} />
      <LoginCard>
        <LogoContainer>
          <Logo style={{ 
            color: theme.colors.textInverse,
            textShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)',
            fontSize: theme.fontSizes['4xl'] + 8
          }}>PCOUNT</Logo>
          <SubTitle>Sistema de Monitoramento</SubTitle>
          <View style={{
            width: 60,
            height: 3,
            backgroundColor: theme.colors.textInverse,
            marginTop: theme.spacing.md,
            borderRadius: 2,
            opacity: 0.8
          }} />
        </LogoContainer>
        
        <FormContainer>
          {/* Título do formulário */}
          <View style={{
            alignItems: 'center',
            marginBottom: theme.spacing.xl
          }}>
            <Text style={{
              fontSize: theme.fontSizes.xl,
              fontWeight: '800',
              color: theme.colors.text,
              textAlign: 'center',
              marginBottom: theme.spacing.xs,
              letterSpacing: -0.5
            }}>Bem-vindo de volta!</Text>
            <Text style={{
              fontSize: theme.fontSizes.sm,
              color: theme.colors.textSecondary,
              textAlign: 'center',
              fontWeight: '500'
            }}>Faça login para continuar</Text>
          </View>
          
          <InputWrapper>
            <View style={{
              position: 'relative',
              marginBottom: theme.spacing.xs
            }}>
              <Text style={{
                fontSize: theme.fontSizes.xs,
                color: theme.colors.textSecondary,
                fontWeight: '600',
                marginBottom: theme.spacing.xs,
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}>E-mail</Text>
              <Input
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: email ? theme.colors.primary : theme.colors.border,
                  borderWidth: 2,
                  fontSize: theme.fontSizes.base,
                  fontWeight: '500'
                }}
              />
            </View>
          </InputWrapper>
          
          <InputWrapper>
            <View style={{
              position: 'relative',
              marginBottom: theme.spacing.md
            }}>
              <Text style={{
                fontSize: theme.fontSizes.xs,
                color: theme.colors.textSecondary,
                fontWeight: '600',
                marginBottom: theme.spacing.xs,
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}>Senha</Text>
              <Input
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: password ? theme.colors.primary : theme.colors.border,
                  borderWidth: 2,
                  fontSize: theme.fontSizes.base,
                  fontWeight: '500'
                }}
              />
            </View>
          </InputWrapper>
          
          <View style={{
            marginTop: theme.spacing.md
          }}>
            <Button onPress={handleLogin} style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              shadowColor: '#667eea',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6
            }}>
              <ButtonText style={{
                fontWeight: '700',
                letterSpacing: 0.8
              }}>Entrar no Sistema</ButtonText>
            </Button>
          </View>
          
          <WelcomeText>
            🔧 Conecte-se para monitorar suas linhas de produção em tempo real
          </WelcomeText>
          
          {/* Indicador de segurança */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.md,
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: 'rgba(16, 185, 129, 0.2)'
          }}>
            <Text style={{
              fontSize: theme.fontSizes.xs,
              color: '#059669',
              fontWeight: '600',
              textAlign: 'center'
            }}>🔒 Conexão Segura SSL</Text>
          </View>
        </FormContainer>
      </LoginCard>
    </GradientBackground>
  );
};