import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Investment } from '../types/investment';

interface InvestmentItemProps {
    investment: Investment;
}
// to Displays a single investment record
const InvestmentItem: React.FC<InvestmentItemProps> = ({ investment }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <View style={styles.container}>
            {/* Header section with investment details */}
            <View style={styles.header}>
                <Text style={styles.farmerName}>{investment.farmer_name}</Text>
                <Text style={styles.amount}>{formatCurrency(investment.amount)}</Text>
            </View>

            <View style={styles.details}>
                <View style={styles.cropContainer}>
                    <Text style={styles.cropLabel}>Crop:</Text>
                    <Text style={styles.cropValue}>{investment.crop}</Text>
                </View>

                <Text style={styles.date}>
                    Invested on {formatDate(investment.created_at)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    farmerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        flex: 1,
    },
    amount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#007AFF',
    },
    details: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 12,
    },
    cropContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    cropLabel: {
        fontSize: 14,
        color: '#666',
        marginRight: 6,
    },
    cropValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        backgroundColor: '#f0f8ff',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    date: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
});

export default InvestmentItem;