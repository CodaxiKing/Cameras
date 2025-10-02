import React from 'react';
import { FlatList, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Contract } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { AppHeader } from '../components/AppHeader';
import {
  Container,
  Title,
  Card,
  ButtonText,
} from '../components/StyledComponents';

interface ContractScreenProps {
  navigation: any;
}

export const ContractScreen: React.FC<ContractScreenProps> = ({ navigation }) => {
  const { selectContract, contracts, loading, error, loadContracts, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  const handleContractSelect = (contract: Contract) => {
    selectContract(contract);
    // Removido navigation.navigate - deixa o AppNavigator controlar automaticamente
  };

  // Mostra loading spinner enquanto carrega
  if (loading) {
    return (
      <Container>
        <AppHeader onLogout={handleLogout} />
        <View style={{ padding: 16, flex: 1 }}>
          <LoadingSpinner message="Carregando contratos..." />
        </View>
      </Container>
    );
  }

  // Mostra erro se houver
  if (error) {
    return (
      <Container>
        <AppHeader onLogout={handleLogout} />
        <View style={{ padding: 16, flex: 1 }}>
          <ErrorMessage 
            message={error} 
            onRetry={loadContracts}
            retryText="Tentar novamente"
          />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <AppHeader onLogout={handleLogout} />
      <View style={{ padding: 16, flex: 1 }}>
        <Title>Selecione o Contrato</Title>
        
        <FlatList
          data={contracts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card onPress={() => handleContractSelect(item)}>
              <ButtonText variant="secondary">{item.name}</ButtonText>
            </Card>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};