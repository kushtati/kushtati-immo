export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl: string;
  type: 'Sale' | 'Rent';
  featured?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AdvisorState {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
}
