import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, Alert, View } from 'react-native';
import { Investment } from './src/types/investment';
import { api } from './src/services/api';
import InvestmentList from './src/components/InvestmentList';
import NewInvestmentModal from './src/components/NewInvestmentModal';
import LoadingErrorState from './src/components/LoadingErrorState';

export default function App() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchInvestments = async () => {
    try {
      setError(null);
      const data = await api.getInvestments();
      setInvestments(data);
    } catch (err) {
      setError('Failed to fetch investments. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchInvestments();
  };

  

  if (loading && !refreshing) {
    return <LoadingErrorState type="loading" />;
  }

  if (error && !refreshing && investments.length === 0) {
    return (
      <LoadingErrorState 
        type="error" 
        message={error} 
        onRetry={fetchInvestments} 
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>FarmInvest Lite</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>
      
      <InvestmentList
        investments={investments}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      
      <NewInvestmentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={() => ""}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});