'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types for our global field registry
export interface FieldConfig {
  id: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  defaultValue: any;
  validation?: (value: any) => boolean;
  description?: string;
}

export interface AppState {
  fields: Record<string, any>;
  fieldConfigs: Record<string, FieldConfig>;
}

export interface AppContextType {
  // State access
  state: AppState;
  
  // Field registry methods
  registerField: (config: FieldConfig) => void;
  unregisterField: (fieldId: string) => void;
  getFieldConfig: (fieldId: string) => FieldConfig | undefined;
  
  // Field value methods
  getFieldValue: <T = any>(fieldId: string) => T | undefined;
  setFieldValue: (fieldId: string, value: any) => void;
  updateFieldValue: (fieldId: string, updater: (current: any) => any) => void;
  resetField: (fieldId: string) => void;
  resetAllFields: () => void;
  
  // Utility methods
  validateField: (fieldId: string, value?: any) => boolean;
  getFieldsByType: (type: FieldConfig['type']) => string[];
  getAllFields: () => Record<string, any>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial state
const initialState: AppState = {
  fields: {},
  fieldConfigs: {},
};

// Provider component
interface AppProviderProps {
  children: ReactNode;
  initialFields?: Record<string, any>;
}

export function AppProvider({ children, initialFields = {} }: AppProviderProps) {
  const [state, setState] = useState<AppState>({
    ...initialState,
    fields: { ...initialState.fields, ...initialFields },
  });

  // Register a new field in the global registry
  const registerField = useCallback((config: FieldConfig) => {
    setState(prev => ({
      ...prev,
      fieldConfigs: {
        ...prev.fieldConfigs,
        [config.id]: config,
      },
      fields: {
        ...prev.fields,
        // Only set default value if field doesn't exist
        ...(!(config.id in prev.fields) && { [config.id]: config.defaultValue }),
      },
    }));
  }, []);

  // Unregister a field from the global registry
  const unregisterField = useCallback((fieldId: string) => {
    setState(prev => {
      const newFieldConfigs = { ...prev.fieldConfigs };
      const newFields = { ...prev.fields };
      delete newFieldConfigs[fieldId];
      delete newFields[fieldId];
      
      return {
        ...prev,
        fieldConfigs: newFieldConfigs,
        fields: newFields,
      };
    });
  }, []);

  // Get field configuration
  const getFieldConfig = useCallback((fieldId: string): FieldConfig | undefined => {
    return state.fieldConfigs[fieldId];
  }, [state.fieldConfigs]);

  // Get field value with type safety
  const getFieldValue = useCallback(<T = any>(fieldId: string): T | undefined => {
    return state.fields[fieldId] as T;
  }, [state.fields]);

  // Set field value with validation
  const setFieldValue = useCallback((fieldId: string, value: any) => {
    const config = state.fieldConfigs[fieldId];
    
    // Validate if validation function exists
    if (config?.validation && !config.validation(value)) {
      console.warn(`Validation failed for field ${fieldId}`);
      return;
    }

    setState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [fieldId]: value,
      },
    }));
  }, [state.fieldConfigs]);

  // Update field value using an updater function
  const updateFieldValue = useCallback((fieldId: string, updater: (current: any) => any) => {
    const currentValue = state.fields[fieldId];
    const newValue = updater(currentValue);
    setFieldValue(fieldId, newValue);
  }, [state.fields, setFieldValue]);

  // Reset field to default value
  const resetField = useCallback((fieldId: string) => {
    const config = state.fieldConfigs[fieldId];
    if (config) {
      setFieldValue(fieldId, config.defaultValue);
    }
  }, [state.fieldConfigs, setFieldValue]);

  // Reset all fields to default values
  const resetAllFields = useCallback(() => {
    setState(prev => {
      const resetFields: Record<string, any> = {};
      Object.entries(prev.fieldConfigs).forEach(([fieldId, config]) => {
        resetFields[fieldId] = config.defaultValue;
      });
      
      return {
        ...prev,
        fields: resetFields,
      };
    });
  }, []);

  // Validate a field value
  const validateField = useCallback((fieldId: string, value?: any): boolean => {
    const config = state.fieldConfigs[fieldId];
    if (!config?.validation) return true;
    
    const valueToValidate = value !== undefined ? value : state.fields[fieldId];
    return config.validation(valueToValidate);
  }, [state.fieldConfigs, state.fields]);

  // Get all fields of a specific type
  const getFieldsByType = useCallback((type: FieldConfig['type']): string[] => {
    return Object.entries(state.fieldConfigs)
      .filter(([, config]) => config.type === type)
      .map(([fieldId]) => fieldId);
  }, [state.fieldConfigs]);

  // Get all field values
  const getAllFields = useCallback((): Record<string, any> => {
    return { ...state.fields };
  }, [state.fields]);

  const contextValue: AppContextType = {
    state,
    registerField,
    unregisterField,
    getFieldConfig,
    getFieldValue,
    setFieldValue,
    updateFieldValue,
    resetField,
    resetAllFields,
    validateField,
    getFieldsByType,
    getAllFields,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Convenience hook for managing a specific field
export function useField<T = any>(fieldId: string, config?: Omit<FieldConfig, 'id'>) {
  const { 
    registerField, 
    unregisterField, 
    getFieldValue, 
    setFieldValue, 
    updateFieldValue,
    resetField,
    validateField,
    getFieldConfig 
  } = useAppContext();

  // Memoize the config to prevent infinite loops
  const memoizedConfig = React.useMemo(() => {
    if (!config) return undefined;
    return {
      type: config.type,
      defaultValue: config.defaultValue,
      validation: config.validation,
      description: config.description,
    };
  }, [
    config?.type,
    config?.defaultValue,
    config?.description,
    config?.validation // Note: validation function should be stable from component
  ]);

  // Track if field has been registered to prevent re-registration
  const hasRegistered = React.useRef(false);

  // Auto-register field if config is provided (only once)
  React.useEffect(() => {
    if (memoizedConfig && !hasRegistered.current) {
      registerField({ id: fieldId, ...memoizedConfig });
      hasRegistered.current = true;
    }
  }, [fieldId, memoizedConfig, registerField]);

  // Cleanup on unmount (optional)
  React.useEffect(() => {
    return () => {
      // Optional: unregister on unmount (comment out if you want fields to persist)
      // if (hasRegistered.current) {
      //   unregisterField(fieldId);
      // }
    };
  }, [fieldId, unregisterField]);

  const value = getFieldValue<T>(fieldId);
  const fieldConfig = getFieldConfig(fieldId);

  return {
    value,
    setValue: (newValue: T) => setFieldValue(fieldId, newValue),
    updateValue: (updater: (current: T | undefined) => T) => updateFieldValue(fieldId, updater),
    reset: () => resetField(fieldId),
    validate: (val?: T) => validateField(fieldId, val),
    config: fieldConfig,
    isRegistered: !!fieldConfig,
  };
}

export default AppProvider;
