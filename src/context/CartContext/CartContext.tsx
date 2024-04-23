import React, { createContext, useMemo, useState } from 'react';
import { CartContextType } from './CartContextType';
import { Product, ProductInCart } from '../../types';

export const CartContext = createContext<CartContextType>({
  cart: [],
  cartQuantity: 0,
  addToCart: () => {},
  deleteFromCart: () => {},
  clearCart: () => {},
  isProductInCart: () => false,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

type Props = {
  children: React.ReactNode;
};

const CART_KEY = 'cart';

const saveCartToLocalStorage = (currentCart: ProductInCart[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(currentCart));
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<ProductInCart[]>(() => {
    const currentCart = localStorage.getItem(CART_KEY);

    if (currentCart === null) {
      return [];
    }

    try {
      return JSON.parse(currentCart);
    } catch (error) {
      localStorage.removeItem(CART_KEY);

      return [];
    }
  });

  const cartQuantity = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  console.log(cart);

  const addToCart = (product: Product) => {
    if (!cart.some((item: ProductInCart) => item.prodId === product.id)) {
      const updatedCart = [
        ...cart,
        { prodId: product.id, product, quantity: 1 },
      ];

      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    }
  };

  const deleteFromCart = (productId: number) => {
    const updatedCart = cart.filter(
      (product: ProductInCart) => product.prodId !== productId,
    );

    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  };

  const isProductInCart = (id: number) => {
    return cart.some((product: ProductInCart) => product.prodId === id);
  };

  const increaseQuantity = (productId: number) => {
    const updatedCart = cart.map((product: ProductInCart) => {
      if (product.prodId === productId) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }

      return product;
    });

    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const decreaseQuantity = (productId: number) => {
    if (
      cart.find((product: ProductInCart) => product.prodId === productId)
        .quantity === 1
    ) {
      deleteFromCart(productId);
      return;
    }

    const updatedCart = cart.map((product: ProductInCart) => {
      if (product.prodId === productId) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }

      return product;
    });

    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const cartState: CartContextType = {
    cart,
    cartQuantity,
    addToCart,
    deleteFromCart,
    clearCart,
    isProductInCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  );
};
