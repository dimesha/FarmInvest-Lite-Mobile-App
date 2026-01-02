import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import { Investment } from '../types/investment';
import InvestmentItem from './InvestmentItem';

interface InvestmentListProps {
  investments: Investment[];
  refreshing: boolean;
  onRefresh: () => void;
  onInvestmentPress?: (investment: Investment) => void;
}

const InvestmentList: React.FC<InvestmentListProps> = ({
  investments,
  refreshing,
  onRefresh,
  onInvestmentPress,
}) => {
  const renderItem = ({ item }: { item: Investment }) => (
    <InvestmentItem investment={item} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No investments found</Text>
      <Text style={styles.emptySubText}>Pull to refresh or create a new investment</Text>
    </View>
  );

  return (
    <FlatList
      data={investments}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#007AFF"
        />
      }
      ListEmptyComponent={renderEmptyState}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default InvestmentList;