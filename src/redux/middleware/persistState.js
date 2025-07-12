// Middleware to persist state in localStorage
export const persistState = (store) => (next) => (action) => {
    const result = next(action);
    
    // Get current state
    const state = store.getState();
    
    // Create a copy of state without sensitive data
    const stateToPersist = {
        ...state,
        address: {
            selectedAddress: null,
            addresses: []
        },
        shipping: {
            selectedShipping: null,
            shippingMethods: []
        },
        legalId: {
            isLegalEnabled: false,
            selectedLegal: null
        },
        paymentWay: {
            selectedPayment: null,
            paymentMethods: []
        }
    };

    // Save to localStorage
    localStorage.setItem('reduxState', JSON.stringify(stateToPersist));
    
    return result;
};

// Load state from localStorage
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

// Save state to localStorage
export const saveState = (state) => {
    try {
        // Create a copy of the state
        const stateToSave = { ...state };
        // Remove states that should not persist
        delete stateToSave.legalId;
        delete stateToSave.address;
        delete stateToSave.shipping;
        delete stateToSave.socialNetworks;
        
        const serializedState = JSON.stringify(stateToSave);
        localStorage.setItem('reduxState', serializedState);
    } catch (err) {
        // Handle errors
    }
}; 