export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  promotionalPrice?: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  tags: ('Novo' | 'Promoção' | 'Esgotado')[];
  description: string;
}

export interface Teacher {
  id: number;
  name: string;
  slug: string;
  specialty: string;
  experience: number;
  avatarUrl: string;
  bio: string;
  whatsapp: string;
}

export interface Modality {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    pricing: {
        plan: string;
        price: number;
    }[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatarUrl: string;
  comment: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}