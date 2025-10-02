import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useProductions } from '../hooks/useProductions';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Card,
} from '../components/StyledComponents';
import { AppHeader } from '../components/AppHeader';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { theme } from '../theme';

interface LineDetailScreenProps {
  route: any;
  navigation: any;
}

export const LineDetailScreen: React.FC<LineDetailScreenProps> = ({ route, navigation }) => {
  const { line } = route.params;
  const { selectedContract, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  // Buscar produções usando o contrato selecionado e filtrar por linha
  // Hook fará no-op se contratoId for falsy
  const { data: allProductions, loading, error } = useProductions(
    selectedContract?.id || '',
    { lineId: line.id }
  );

  // Verificar se um contrato foi selecionado
  if (!selectedContract) {
    return (
      <Container>
        <AppHeader onLogout={handleLogout} />
        <View style={{ padding: 16, flex: 1 }}>
          <ErrorMessage 
            message="Nenhum contrato selecionado. Por favor, faça login novamente."
          />
        </View>
      </Container>
    );
  }

  // Mostrar loading
  if (loading) {
    return (
      <Container>
        <AppHeader onLogout={handleLogout} />
        <View style={{ padding: 16, flex: 1 }}>
          <LoadingSpinner />
        </View>
      </Container>
    );
  }

  // Mostrar erro
  if (error) {
    return (
      <Container>
        <AppHeader onLogout={handleLogout} />
        <View style={{ padding: 16, flex: 1 }}>
          <ErrorMessage message={error} />
        </View>
      </Container>
    );
  }

  const lineProductions = allProductions || [];
  const activeProductions = lineProductions.filter(prod => prod.status === 'EM PRODUCAO');
  const finishedProductions = lineProductions.filter(prod => prod.status === 'FINALIZADA');

  const ProductionItem = ({ production }: { production: any }) => (
    <Card style={{ marginBottom: 8 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductionDetail', {
            production: production,
            line: line
          });
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <View style={{ 
              backgroundColor: production.status === 'EM PRODUCAO' ? theme.colors.success : theme.colors.textSecondary,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
              alignSelf: 'flex-start',
              marginBottom: 8
            }}>
              <Text style={{ 
                color: theme.colors.white,
                fontSize: 12,
                fontWeight: 'bold'
              }}>
                {line.name}
              </Text>
              <Text style={{ 
                color: theme.colors.white,
                fontSize: 10
              }}>
                {production.status}
              </Text>
            </View>
            
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
              Código: <Text style={{ fontWeight: 'normal' }}>{production.productCode}</Text>
            </Text>
            
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
              Produto: <Text style={{ fontWeight: 'normal' }}>{production.productName}</Text>
            </Text>
            
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
              Técnico: <Text style={{ fontWeight: 'normal' }}>{production.technician}</Text>
            </Text>
            
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
              Data início: <Text style={{ fontWeight: 'normal' }}>{production.startDate}</Text>
            </Text>
            
            {production.endDate && (
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                Data final: <Text style={{ fontWeight: 'normal' }}>{production.endDate}</Text>
              </Text>
            )}
          </View>
          
          <Text style={{ fontSize: 18, color: theme.colors.primary }}>→</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <Container>
      <AppHeader onLogout={handleLogout} />
      
      {/* Botão de Voltar Flutuante */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 60,
          left: 16,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 8,
          borderWidth: 1,
          borderColor: 'rgba(102, 126, 234, 0.3)',
        }}
        activeOpacity={0.7}
      >
        <MaterialIcons name="arrow-back" size={20} color="#667eea" />
        <Text style={{
          marginLeft: 8,
          fontSize: 15,
          fontWeight: '600',
          color: '#667eea'
        }}>
          Voltar
        </Text>
      </TouchableOpacity>
      
      <ScrollView style={{ padding: 16 }}>
        {/* Produção Ativa */}
        {activeProductions.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={{ 
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 12,
              color: theme.colors.text
            }}>
              EM PRODUÇÃO
            </Text>
            {activeProductions.map((production) => (
              <ProductionItem key={production.id} production={production} />
            ))}
          </View>
        )}

        {/* Produções Finalizadas */}
        {finishedProductions.length > 0 && (
          <View>
            <Text style={{ 
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 12,
              color: theme.colors.text
            }}>
              FINALIZADAS
            </Text>
            {finishedProductions.map((production) => (
              <ProductionItem key={production.id} production={production} />
            ))}
          </View>
        )}

        {/* Caso não tenha produções */}
        {lineProductions.length === 0 && (
          <View style={{ 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 100
          }}>
            <Text style={{ 
              fontSize: 16,
              color: theme.colors.textSecondary,
              textAlign: 'center'
            }}>
              Nenhuma produção encontrada para esta linha
            </Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};