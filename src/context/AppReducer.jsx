export const initialState = {
  currentUser: null,
  activeTab: 'login',
  products: [
    { 
      id: 1, 
      name: 'Fresh Tomatoes', 
      price: '₦50/kg', 
      quantity: '200kg', 
      farmer: 'John Adebayo', 
      location: 'Ibadan', 
      rating: 4.8, 
      image: 'https://via.placeholder.com/300x200?text=Tomatoes', 
      category: 'Vegetables', 
      harvestDate: '2025-07-15' 
    },
    { 
      id: 2, 
      name: 'Organic Rice', 
      price: '₦400/kg', 
      quantity: '500kg', 
      farmer: 'Fatima Hassan', 
      location: 'Kaduna', 
      rating: 4.9, 
      image: 'https://via.placeholder.com/300x200?text=Rice', 
      category: 'Grains', 
      harvestDate: '2025-07-10' 
    },
    { 
      id: 3, 
      name: 'Sweet Potatoes', 
      price: '₦80/kg', 
      quantity: '150kg', 
      farmer: 'Emeka Okafor', 
      location: 'Enugu', 
      rating: 4.7, 
      image: 'https://via.placeholder.com/300x200?text=Sweet+Potatoes', 
      category: 'Tubers', 
      harvestDate: '2025-07-20' 
    }
  ],
  messages: [],
  orders: [],
  notifications: [
    { id: 1, text: 'Welcome to AgriConnect!', type: 'info', time: '1 hour ago' },
    { id: 2, text: 'New products available in marketplace', type: 'success', time: '3 hours ago' }
  ],
  chatOpen: false,
  selectedProduct: null,
  searchTerm: '',
  filterCategory: 'all'
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload,
        activeTab: action.payload.type === 'farmer' ? 'dashboard' : 
                   action.payload.type === 'buyer' ? 'marketplace' : 'admin'
      };
    
    case 'LOGOUT':
      return {
        ...initialState
      };
    
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload
      };
    
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, { ...action.payload, id: Date.now() }],
        notifications: [
          ...state.notifications,
          { 
            id: Date.now(), 
            text: `New product "${action.payload.name}" added successfully`, 
            type: 'success', 
            time: 'Just now' 
          }
        ]
      };
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        notifications: [
          ...state.notifications,
          { 
            id: Date.now(), 
            text: `Order placed for ${action.payload.product.name}`, 
            type: 'order', 
            time: 'Just now' 
          }
        ]
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      };
    
    case 'OPEN_CHAT':
      return {
        ...state,
        chatOpen: true,
        selectedProduct: action.payload
      };
    
    case 'CLOSE_CHAT':
      return {
        ...state,
        chatOpen: false,
        selectedProduct: null
      };
    
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };
    
    case 'SET_FILTER_CATEGORY':
      return {
        ...state,
        filterCategory: action.payload
      };
    
    case 'EDIT_PRODUCT':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            text: `Product "${action.payload.name}" updated successfully`,
            type: 'success',
            time: 'Just now'
          }
        ]
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            text: 'Product deleted successfully',
            type: 'success',
            time: 'Just now'
          }
        ]
      };
    
    default:
      return state;
  }
};