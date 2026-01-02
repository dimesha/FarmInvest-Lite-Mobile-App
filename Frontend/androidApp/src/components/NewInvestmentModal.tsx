import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NewInvestment } from '../types/investment';

interface NewInvestmentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (investment: NewInvestment) => void;
}

const NewInvestmentModal: React.FC<NewInvestmentModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    farmer_name: '',
    amount: '',
    crop: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.farmer_name.trim()) {
      newErrors.farmer_name = 'Farmer name is required';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else {
      const amountNum = parseFloat(formData.amount);
      if (isNaN(amountNum)) {
        newErrors.amount = 'Amount must be a valid number';
      } else if (amountNum <= 0) {
        newErrors.amount = 'Amount must be a positive number';
      }
    }

    if (!formData.crop.trim()) {
      newErrors.crop = 'Crop type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    // Convert amount from string to number
    const investment: NewInvestment = {
      farmer_name: formData.farmer_name.trim(),
      amount: parseFloat(formData.amount),
      crop: formData.crop.trim(),
    };

    // Simulate API delay for better UX
    setTimeout(() => {
      onSubmit(investment);
      resetForm();
      onClose();
      setSubmitting(false);
    }, 500);
  };

  const resetForm = () => {
    setFormData({
      farmer_name: '',
      amount: '', 
      crop: '',
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      setFormData({ ...formData, amount: parts[0] + '.' + parts.slice(1).join('') });
    } else {
      setFormData({ ...formData, amount: cleaned });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>New Investment</Text>
              <TouchableOpacity onPress={handleClose}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
                {/* Farmer Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Farmer Name *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.farmer_name && styles.inputError,
                    ]}
                    value={formData.farmer_name}
                    onChangeText={(text) =>
                      setFormData({ ...formData, farmer_name: text })
                    }
                    placeholder="Enter farmer's name"
                    placeholderTextColor="#999"
                    editable={!submitting}
                    autoCapitalize="words"
                  />
                  {errors.farmer_name && (
                    <Text style={styles.errorText}>{errors.farmer_name}</Text>
                  )}
                </View>

                {/* Amount */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Investment Amount ($) *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.amount && styles.inputError,
                    ]}
                    value={formData.amount}
                    onChangeText={handleAmountChange}
                    placeholder="e.g., 5000"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    editable={!submitting}
                  />
                  {errors.amount && (
                    <Text style={styles.errorText}>{errors.amount}</Text>
                  )}
                </View>

                {/* Crop */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Crop Type *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.crop && styles.inputError,
                    ]}
                    value={formData.crop}
                    onChangeText={(text) =>
                      setFormData({ ...formData, crop: text })
                    }
                    placeholder="e.g., Corn, Wheat, Soybeans"
                    placeholderTextColor="#999"
                    editable={!submitting}
                    autoCapitalize="words"
                  />
                  {errors.crop && (
                    <Text style={styles.errorText}>{errors.crop}</Text>
                  )}
                </View>

                {/* Example Crops */}
                <View style={styles.cropExamples}>
                  <Text style={styles.examplesLabel}>Common crops:</Text>
                  <View style={styles.exampleTags}>
                    {['Corn', 'Wheat', 'Soybeans', 'Rice', 'Cotton'].map(
                      (crop) => (
                        <TouchableOpacity
                          key={crop}
                          style={styles.exampleTag}
                          onPress={() =>
                            setFormData({ ...formData, crop })
                          }
                          disabled={submitting}
                        >
                          <Text style={styles.exampleTagText}>{crop}</Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
                disabled={submitting}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.submitButton,
                  submitting && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={submitting}
              >
                <Text style={styles.submitButtonText}>
                  {submitting ? 'Creating...' : 'Create Investment'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
    paddingHorizontal: 8,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#ff3b30',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
  cropExamples: {
    marginTop: 10,
  },
  examplesLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  exampleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exampleTag: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  exampleTagText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  submitButtonDisabled: {
    backgroundColor: '#66a3ff',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NewInvestmentModal;