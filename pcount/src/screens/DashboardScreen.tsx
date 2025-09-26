import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Svg, Rect, Text as SvgText, Line, G } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useProductionStats, useProductionLines } from '../hooks/useProductions';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Title,
  Card,
  FeaturedCard,
  FeaturedCardTitle,
  FeaturedCardValue,
  FeaturedCardSubtitle,
  FeaturedCardAccent,
  FeaturedCardIcon,
  Button,
  ButtonText,
  Input,
} from '../components/StyledComponents';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

// Componente de cartão do Total Produzido com design modernizado
const TotalProducedCard: React.FC<{ 
  value: number; 
  title: string;
  subtitle?: string;
}> = ({ value, title, subtitle }) => {
  // Garantir que o valor seja positivo
  const safeValue = Math.max(0, value);
  
  // Definir os níveis e cores (baseado na imagem de referência)
  const levels = [
    { threshold: 4800, color: '#dc2626', label: '4800' },
    { threshold: 6600, color: '#ea580c', label: '6600' },
    { threshold: 8400, color: '#65a30d', label: '8400' },
    { threshold: 10200, color: '#16a34a', label: '10200' },
    { threshold: 13000, color: '#0891b2', label: '13000' }
  ];
  
  // Determinar qual nível foi atingido
  const currentLevel = levels.reduce((prev, curr) => 
    safeValue >= curr.threshold ? curr : prev, 
    levels[0]
  );
  
  return (
    <View style={{
      backgroundColor: '#ffffff',
      borderRadius: theme.borderRadius['2xl'],
      padding: theme.spacing.xl,
      marginVertical: theme.spacing.md,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efeito de gradiente de fundo */}
      <LinearGradient
        colors={['rgba(6, 182, 212, 0.05)', 'rgba(6, 182, 212, 0.02)']}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      
      {/* Título */}
      <Text style={{
        fontSize: theme.fontSizes.sm,
        fontWeight: '700',
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
        letterSpacing: 1,
        textTransform: 'uppercase'
      }}>
        {title}
      </Text>
      
      {/* Layout do conteúdo principal */}
      <View style={{ alignItems: 'center' }}>
        {/* Círculo visual com indicador de progresso */}
        <View style={{
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: '#f8fafc',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
          borderWidth: 8,
          borderColor: currentLevel.color,
          position: 'relative'
        }}>
          {/* Valor principal */}
          <Text style={{
            fontSize: 36,
            fontWeight: '900',
            color: theme.colors.text,
            textAlign: 'center'
          }}>
            {safeValue.toLocaleString('pt-BR')}
          </Text>
          
          {/* Indicador pequeno do nível atual */}
          <View style={{
            position: 'absolute',
            top: -12,
            right: -12,
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: currentLevel.color,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <MaterialIcons name="trending-up" size={14} color="#ffffff" />
          </View>
        </View>
        
        {/* Legend horizontal */}
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          marginBottom: theme.spacing.md
        }}>
          {levels.map((level, index) => (
            <View key={index} style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: theme.spacing.xs,
              marginBottom: theme.spacing.xs,
              backgroundColor: safeValue >= level.threshold ? level.color : '#f1f5f9',
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: 4,
              borderRadius: theme.borderRadius.md,
              opacity: safeValue >= level.threshold ? 1 : 0.6
            }}>
              <Text style={{
                fontSize: theme.fontSizes.xs,
                color: safeValue >= level.threshold ? '#ffffff' : theme.colors.text,
                fontWeight: '700'
              }}>
                {level.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      {subtitle && (
        <Text style={{
          fontSize: theme.fontSizes.xs,
          color: theme.colors.textSecondary,
          textAlign: 'center',
          fontWeight: '500',
          marginTop: theme.spacing.sm
        }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

// Componente de cartão de estatística modernizado
const StatCard: React.FC<{
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  backgroundColor?: string;
}> = ({ title, value, subtitle, icon, accentColor, backgroundColor = '#ffffff' }) => {
  return (
    <View style={{
      backgroundColor: backgroundColor,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.md,
      flex: 1,
      marginHorizontal: theme.spacing.xs,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      borderLeftWidth: 4,
      borderLeftColor: accentColor,
      minHeight: 80
    }}>
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: theme.spacing.xs
      }}>
        <Text style={{ 
          fontSize: theme.fontSizes.xs, 
          color: theme.colors.textSecondary,
          fontWeight: '600',
          flex: 1
        }}>
          {title}
        </Text>
        <View style={{
          backgroundColor: accentColor,
          borderRadius: theme.borderRadius.sm,
          padding: 6,
          width: 28,
          height: 28,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <MaterialIcons name={icon as any} size={16} color="#ffffff" />
        </View>
      </View>
      
      <Text style={{ 
        fontSize: theme.fontSizes.xl, 
        fontWeight: '800', 
        color: theme.colors.text,
        marginBottom: 2
      }}>
        {value}
      </Text>
      
      <Text style={{ 
        fontSize: theme.fontSizes.xs, 
        color: theme.colors.textSecondary,
        fontWeight: '500'
      }}>
        {subtitle}
      </Text>
    </View>
  );
};

// Componente de gráfico de barras modernizado para mobile
const BarChart: React.FC<{ data: Array<{ hour: string; value: number }> }> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <View style={{ 
        alignItems: 'center', 
        marginVertical: theme.spacing.lg, 
        height: 160, 
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
        borderWidth: 1,
        borderColor: '#e2e8f0'
      }}>
        <MaterialIcons name="equalizer" size={32} color={theme.colors.textSecondary} />
        <Text style={{ 
          color: theme.colors.textSecondary, 
          textAlign: 'center',
          fontSize: theme.fontSizes.sm,
          fontWeight: '500',
          marginTop: theme.spacing.sm
        }}>
          Nenhum dado disponível
        </Text>
      </View>
    );
  }

  // Tamanho responsivo e adaptativo para diferentes tamanhos de tela
  const baseChartWidth = Math.min(width - 40, 480);
  const chartHeight = 140;
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const padding = { top: 20, right: 16, bottom: 30, left: 16 };
  
  // Calcular largura das barras para evitar overflow
  const availableWidth = baseChartWidth - padding.left - padding.right;
  const barGroupWidth = availableWidth / data.length;
  const actualBarWidth = Math.min(barGroupWidth * 0.7, 28); // Máximo 28px por barra
  const showLabels = barGroupWidth >= 14; // Só mostrar labels se houver espaço

  return (
    <View style={{ marginVertical: theme.spacing.md, alignItems: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <Svg width={baseChartWidth} height={chartHeight + padding.top + padding.bottom}>
          {/* Background sutil */}
          <Rect
            x={0}
            y={0}
            width={baseChartWidth}
            height={chartHeight + padding.top + padding.bottom}
            fill="#fafbfc"
            rx={8}
          />
          
          {/* Grid lines horizontais sutis */}
          {[1, 2, 3].map((i) => {
            const y = padding.top + (i * chartHeight) / 4;
            return (
              <Line
                key={i}
                x1={padding.left}
                y1={y}
                x2={baseChartWidth - padding.right}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth={0.5}
                opacity={0.7}
              />
            );
          })}

          {/* Barras com gradiente e estilo moderno */}
          {data.map((item, index) => {
            const barHeight = Math.max((item.value / maxValue) * chartHeight, 4);
            const x = padding.left + index * barGroupWidth + (barGroupWidth - actualBarWidth) / 2;
            const y = padding.top + chartHeight - barHeight;
            
            return (
              <G key={index}>
                {/* Barra principal */}
                <Rect
                  x={x}
                  y={y}
                  width={actualBarWidth}
                  height={barHeight}
                  fill="#3b82f6"
                  rx={Math.min(actualBarWidth / 8, 4)}
                  ry={Math.min(actualBarWidth / 8, 4)}
                />
                
                {/* Efeito de gradiente/highlight */}
                {actualBarWidth >= 8 && (
                  <Rect
                    x={x + 2}
                    y={y}
                    width={actualBarWidth - 4}
                    height={Math.max(barHeight * 0.3, 2)}
                    fill="#60a5fa"
                    rx={2}
                    ry={2}
                    opacity={0.8}
                  />
                )}
                
                {/* Valor em cima da barra (apenas se houver espaço) */}
                {barHeight > 20 && showLabels && item.value > 0 && (
                  <SvgText
                    x={x + actualBarWidth / 2}
                    y={y - 6}
                    fontSize="9"
                    fill={theme.colors.text}
                    textAnchor="middle"
                    fontWeight="700"
                  >
                    {item.value}
                  </SvgText>
                )}
                
                {/* Label do horário */}
                {showLabels && (
                  <SvgText
                    x={x + actualBarWidth / 2}
                    y={padding.top + chartHeight + 18}
                    fontSize="9"
                    fill={theme.colors.textSecondary}
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {item.hour.split(':')[0]}h
                  </SvgText>
                )}
              </G>
            );
          })}

          {/* Linha base sutil */}
          <Line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={baseChartWidth - padding.right}
            y2={padding.top + chartHeight}
            stroke="#d1d5db"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </Svg>
      </View>
      
      {/* Valor máximo para referência */}
      {maxValue > 0 && (
        <Text style={{
          fontSize: theme.fontSizes.xs,
          color: theme.colors.textSecondary,
          marginTop: theme.spacing.sm,
          textAlign: 'center'
        }}>
          Máximo: {maxValue} unidades
        </Text>
      )}
    </View>
  );
};

// Componente do header modernizado
const DashboardHeader: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <LinearGradient
      colors={['#0ea5e9', '#3b82f6', '#6366f1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
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
      
      {/* Logo PCOUNT */}
      <Text style={{
        fontSize: theme.fontSizes['3xl'],
        fontWeight: '900',
        color: theme.colors.textInverse,
        textAlign: 'center',
        flex: 1,
        letterSpacing: -0.5,
        marginHorizontal: theme.spacing.lg
      }}>PCOUNT</Text>
      
      {/* Botão Power */}
      <TouchableOpacity
        onPress={onLogout}
        style={{
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          borderRadius: theme.borderRadius.xl,
          width: 42,
          height: 42,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 5
        }}
      >
        <MaterialIcons name="power-settings-new" size={20} color={theme.colors.textInverse} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

// Componente do seletor de datas
const DateSelector: React.FC<{
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
}> = ({ startDate, endDate, onDateChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '--';
    
    // Parse manual da data ISO para evitar problemas de timezone
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return '--';
    
    // Cria data local sem problemas de timezone
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
  };
  
  // Função para obter data e hora atual do Brasil
  const getBrazilDateTime = () => {
    const now = new Date();
    return now.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Função para obter data atual do Brasil no formato YYYY-MM-DD
  const getBrazilDate = () => {
    const now = new Date();
    const brazilTime = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(now);
    return brazilTime; // Retorna no formato YYYY-MM-DD
  };
  
  // Função para obter data no formato YYYY-MM-DD (fuso horário do Brasil)
  const getLocalDateString = (date: Date = new Date()) => {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };
  
  // Função para converter YYYY-MM-DD para DD/MM/YYYY
  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return '';
    
    // Verifica se já está no formato DD/MM/YYYY
    if (dateStr.includes('/')) {
      return dateStr;
    }
    
    // Valida formato YYYY-MM-DD
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(dateStr)) {
      return dateStr; // Retorna como está se não for válido
    }
    
    const [year, month, day] = dateStr.split('-');
    if (year && month && day) {
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };
  
  // Função para converter DD/MM/YYYY para YYYY-MM-DD
  const parseInputDate = (dateStr: string) => {
    if (!dateStr) return '';
    
    // Se já estiver no formato YYYY-MM-DD válido, retorna como está
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (isoDateRegex.test(dateStr)) {
      return dateStr;
    }
    
    // Se estiver no formato DD/MM/YYYY, converte
    const brDateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (brDateRegex.test(dateStr)) {
      const [day, month, year] = dateStr.split('/');
      if (day && month && year) {
        const dayPadded = day.padStart(2, '0');
        const monthPadded = month.padStart(2, '0');
        
        // Valida se a data é válida
        const testDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        if (testDate.getFullYear() == parseInt(year) && 
            testDate.getMonth() == parseInt(month) - 1 && 
            testDate.getDate() == parseInt(day)) {
          return `${year}-${monthPadded}-${dayPadded}`;
        }
      }
    }
    
    // Se não conseguir converter, retorna vazio para evitar datas inválidas
    return '';
  };
  
  const handleSave = () => {
    // Converte as datas de DD/MM/YYYY para YYYY-MM-DD antes de salvar
    const startDateConverted = parseInputDate(tempStartDate);
    const endDateConverted = parseInputDate(tempEndDate);
    
    // Só salva se ambas as datas forem válidas
    if (startDateConverted && endDateConverted) {
      onDateChange(startDateConverted, endDateConverted);
      setShowModal(false);
    } else {
      // Aqui poderia mostrar uma mensagem de erro, por enquanto só não fecha o modal
      console.warn('Datas inválidas:', { tempStartDate, tempEndDate });
    }
  };
  
  const presetRanges = [
    { label: 'Hoje', start: getBrazilDate(), end: getBrazilDate() },
    { label: 'Esta semana', start: getWeekStart(), end: getBrazilDate() },
    { label: 'Este mês', start: getMonthStart(), end: getBrazilDate() },
  ];
  
  function getWeekStart() {
    const now = new Date();
    
    // Obtém a data atual no Brasil
    const brazilToday = getBrazilDate();
    const [year, month, day] = brazilToday.split('-').map(Number);
    
    // Cria data UTC para o dia atual do Brasil
    const brazilDate = new Date(Date.UTC(year, month - 1, day));
    const dayOfWeek = brazilDate.getUTCDay();
    
    // Calcula o início da semana (domingo = 0)
    const daysToSubtract = dayOfWeek;
    const weekStartUTC = new Date(brazilDate);
    weekStartUTC.setUTCDate(brazilDate.getUTCDate() - daysToSubtract);
    
    // Formata de volta para YYYY-MM-DD
    const weekStartYear = weekStartUTC.getUTCFullYear();
    const weekStartMonth = String(weekStartUTC.getUTCMonth() + 1).padStart(2, '0');
    const weekStartDay = String(weekStartUTC.getUTCDate()).padStart(2, '0');
    
    return `${weekStartYear}-${weekStartMonth}-${weekStartDay}`;
  }
  
  function getMonthStart() {
    // Obtém a data atual no Brasil
    const brazilToday = getBrazilDate();
    const [year, month] = brazilToday.split('-').map(Number);
    
    // Primeiro dia do mês atual do Brasil
    const monthStartYear = year;
    const monthStartMonth = String(month).padStart(2, '0');
    const monthStartDay = '01';
    
    return `${monthStartYear}-${monthStartMonth}-${monthStartDay}`;
  };;
  
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          // Converte as datas para DD/MM/YYYY para exibir nos inputs
          setTempStartDate(formatDateForInput(startDate));
          setTempEndDate(formatDateForInput(endDate));
          setShowModal(true);
        }}
        style={{
          backgroundColor: theme.colors.surfaceElevated,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.sm,
          borderRadius: theme.borderRadius.full,
          marginBottom: theme.spacing.sm,
          alignSelf: 'flex-start',
          borderWidth: 1,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2
        }}
      >
        <Text style={{ 
          color: theme.colors.text, 
          fontSize: theme.fontSizes.xs, 
          fontWeight: '600',
          letterSpacing: 0.5
        }}>
          📅 De: {formatDate(startDate)} Até: {formatDate(endDate)}
        </Text>
      </TouchableOpacity>
      
      <Modal visible={showModal} transparent animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: theme.colors.overlay,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: theme.colors.surfaceElevated,
            borderRadius: 12,
            padding: 20,
            width: '80%',
            maxHeight: '70%'
          }}>
            <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
              Selecionar Período
            </Text>
            
            {/* Seleção manual de datas */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: theme.colors.text, fontSize: 14, marginBottom: 8 }}>Data Inicial:</Text>
              <View style={{ 
                backgroundColor: theme.colors.surface, 
                borderRadius: 8, 
                marginBottom: 12,
                paddingHorizontal: 12,
                paddingVertical: 4
              }}>
                <Input
                  value={tempStartDate}
                  onChangeText={setTempStartDate}
                  placeholder="dd/mm/yyyy"
                  placeholderTextColor={theme.colors.textSecondary}
                  style={{ 
                    color: theme.colors.text, 
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    margin: 0,
                    height: 40
                  }}
                />
              </View>
              
              <Text style={{ color: theme.colors.text, fontSize: 14, marginBottom: 8 }}>Data Final:</Text>
              <View style={{ 
                backgroundColor: theme.colors.surface, 
                borderRadius: 8, 
                marginBottom: 12,
                paddingHorizontal: 12,
                paddingVertical: 4
              }}>
                <Input
                  value={tempEndDate}
                  onChangeText={setTempEndDate}
                  placeholder="dd/mm/yyyy"
                  placeholderTextColor={theme.colors.textSecondary}
                  style={{ 
                    color: theme.colors.text, 
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    margin: 0,
                    height: 40
                  }}
                />
              </View>
            </View>
            
            {/* Períodos pré-definidos */}
            <Text style={{ color: theme.colors.text, fontSize: 14, marginBottom: 8 }}>Períodos rápidos:</Text>
            {presetRanges.map((range, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // Converte as datas dos presets para DD/MM/YYYY
                  setTempStartDate(formatDateForInput(range.start));
                  setTempEndDate(formatDateForInput(range.end));
                }}
                style={{
                  backgroundColor: theme.colors.surface,
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 8
                }}
              >
                <Text style={{ color: theme.colors.textInverse, textAlign: 'center' }}>{range.label}</Text>
              </TouchableOpacity>
            ))}
            
            <View style={{ flexDirection: 'row', marginTop: 16 }}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{
                  backgroundColor: theme.colors.error,
                  padding: 12,
                  borderRadius: 8,
                  flex: 1,
                  marginRight: 8
                }}
              >
                <Text style={{ color: theme.colors.textInverse, textAlign: 'center', fontWeight: 'bold' }}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  backgroundColor: theme.colors.primary,
                  padding: 12,
                  borderRadius: 8,
                  flex: 1,
                  marginLeft: 8
                }}
              >
                <Text style={{ color: theme.colors.textInverse, textAlign: 'center', fontWeight: 'bold' }}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Componente do seletor de produção
const ProductionSelector: React.FC<{
  selectedLineId: string | null;
  onLineChange: (lineId: string | null) => void;
  lines: any[];
}> = ({ selectedLineId, onLineChange, lines }) => {
  const [showModal, setShowModal] = useState(false);
  
  const selectedLine = lines.find(line => line.id === selectedLineId);
  
  return (
    <>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          backgroundColor: theme.colors.surfaceElevated,
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.xl,
          marginBottom: theme.spacing.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3
        }}
      >
        <Text style={{ 
          color: theme.colors.text, 
          fontSize: theme.fontSizes.sm, 
          fontWeight: '600', 
          textAlign: 'center',
          letterSpacing: 0.3
        }}>
          🏭 {selectedLineId ? selectedLine?.name || 'Linha específica' : 'Todas as Linhas'}
        </Text>
      </TouchableOpacity>
      
      <Modal visible={showModal} transparent animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: theme.colors.overlay,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: theme.colors.surfaceElevated,
            borderRadius: 12,
            padding: 20,
            width: '80%',
            maxHeight: '70%'
          }}>
            <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
              Todo(s)
            </Text>
            
            <TouchableOpacity
              onPress={() => {
                onLineChange(null);
                setShowModal(false);
              }}
              style={{
                backgroundColor: selectedLineId === null ? theme.colors.primary : theme.colors.surface,
                padding: 12,
                borderRadius: 8,
                marginBottom: 8
              }}
            >
              <Text style={{ color: theme.colors.textInverse, textAlign: 'center', fontWeight: 'bold' }}>Todo(s)</Text>
            </TouchableOpacity>
            
            <ScrollView style={{ maxHeight: 200 }}>
              {lines.map((line) => (
                <TouchableOpacity
                  key={line.id}
                  onPress={() => {
                    onLineChange(line.id);
                    setShowModal(false);
                  }}
                  style={{
                    backgroundColor: selectedLineId === line.id ? theme.colors.primary : theme.colors.surface,
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 8
                  }}
                >
                  <Text style={{ color: theme.colors.textInverse, textAlign: 'center' }}>{line.name} {line.code}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                backgroundColor: theme.colors.error,
                padding: 12,
                borderRadius: 8,
                marginTop: 16
              }}
            >
              <Text style={{ color: theme.colors.textInverse, textAlign: 'center', fontWeight: 'bold' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export const DashboardScreen: React.FC = () => {
  const { selectedContract, currentUser, logout } = useAuth();
  
  // Estados para filtros
  // Função para obter data do Brasil (deve estar antes dos useState)
  const getBrazilDateForInit = () => {
    const now = new Date();
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(now);
  };
  
  const [startDate, setStartDate] = useState(getBrazilDateForInit());
  const [endDate, setEndDate] = useState(getBrazilDateForInit());
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  
  // Buscar linhas de produção
  const { data: productionLines } = useProductionLines(selectedContract?.id || '');
  
  // Construir filtros para a API
  const filters = useMemo(() => ({
    startDate,
    endDate,
    lineId: selectedLineId || undefined,
    usuarioId: currentUser?.id,
  }), [startDate, endDate, selectedLineId, currentUser?.id]);
  
  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  const handleLogout = async () => {
    await logout();
  };

  // Verificar se um contrato foi selecionado e usuário autenticado antes de chamar hooks
  if (!selectedContract) {
    return (
      <Container style={{ padding: 16 }}>
        <ErrorMessage 
          message="Nenhum contrato selecionado. Por favor, faça login novamente."
        />
      </Container>
    );
  }

  if (!currentUser?.id) {
    return (
      <Container style={{ padding: 16 }}>
        <ErrorMessage 
          message="Usuário não autenticado. Por favor, faça login novamente."
        />
      </Container>
    );
  }

  // Buscar as estatísticas de produção usando o contrato selecionado e filtros
  const { data: productionStats, loading, error } = useProductionStats(
    selectedContract.id,
    filters
  );

  // Mostrar loading
  if (loading) {
    return (
      <Container style={{ padding: 16 }}>
        <Title>Carregando Dashboard...</Title>
        <LoadingSpinner />
      </Container>
    );
  }

  // Mostrar erro
  if (error) {
    return (
      <Container>
        <ScrollView style={{ padding: 16 }}>
          <Title>Dashboard</Title>
          <ErrorMessage message={error} />
        </ScrollView>
      </Container>
    );
  }

  // Dados padrão caso não haja dados da API
  const stats = productionStats || {
    operationHours: '--',
    productiveHours: '--',
    avgProduction: 0,
    totalProduced: 0,
    hourlyProduction: [],
  };

  return (
    <Container>
      <DashboardHeader onLogout={handleLogout} />
      
      <ScrollView style={{ padding: 16 }}>
        <DateSelector
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
        />
        
        <ProductionSelector
          selectedLineId={selectedLineId}
          onLineChange={setSelectedLineId}
          lines={productionLines || []}
        />
        
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold', 
          color: theme.colors.text, 
          marginBottom: 16,
          textAlign: 'center'
        }}>Dashboard {selectedLineId ? productionLines?.find(l => l.id === selectedLineId)?.name : ''}</Text>
        
        {/* Cartões de estatísticas modernos */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          marginBottom: theme.spacing.lg,
          paddingHorizontal: theme.spacing.xs
        }}>
          <StatCard
            title="Hora(s)"
            value={stats.operationHours}
            subtitle="Operação"
            icon="schedule"
            accentColor="#f59e0b"
          />
          
          <StatCard
            title="Hora(s)"
            value={stats.productiveHours}
            subtitle="Produtivas"
            icon="warning"
            accentColor="#ef4444"
          />
          
          <StatCard
            title="Produção"
            value={`${stats.avgProduction}`}
            subtitle="Média / Hr"
            icon="trending-up"
            accentColor="#06b6d4"
          />
        </View>
        
        {/* Cartão do Total Produzido */}
        <TotalProducedCard
          value={stats.totalProduced}
          title="TOTAL PRODUZIDO"
          subtitle="Unidades produzidas no período"
        />
        
        <Card style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 16, color: theme.colors.text }}>TOTAL PRODUZIDO / HORA</Text>
          <BarChart data={stats.hourlyProduction} />
          <Text style={{ 
            fontSize: 11, 
            color: theme.colors.textSecondary, 
            textAlign: 'center', 
            marginTop: 8 
          }}>
            Unidades produzidas por horário de trabalho
          </Text>
        </Card>
      </ScrollView>
    </Container>
  );
};