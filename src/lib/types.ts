export interface Service {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    price: string;
    icon: string;
    image: string;
  }
  
  export interface PortfolioCase {
    id: string;
    watchModel: string;
    description: string;
    beforeImage: string;
    afterImage: string;
    details: string[];
  }
  
  export interface PriceItem {
    name: string;
    price: string;
    category: string;
  }
  