/**
 * useCart — global cart state backed by the API
 *
 * Provides:
 *   cartItems  : string[]   — list of resourceId strings currently in cart
 *   count      : number     — quick count (used by Navbar badge)
 *   loading    : boolean    — any pending toggle request
 *   isInCart   : (id) => boolean
 *   toggle     : (id, shouldAdd) => Promise<boolean>  — add or remove
 *   refetch    : () => Promise<void>
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Module-level cache so all hook instances share state
let _cartItems = [];
let _listeners = [];

function notify() {
  _listeners.forEach((fn) => fn([..._cartItems]));
}

export const useCart = () => {
  const { isSignedIn } = useAuth();
  const [cartItems, setCartItems] = useState(_cartItems);
  const [loading, setLoading] = useState(false);
  const initialized = useRef(false);

  // Subscribe to module-level state
  useEffect(() => {
    const listener = (items) => setCartItems(items);
    _listeners.push(listener);
    return () => {
      _listeners = _listeners.filter((l) => l !== listener);
    };
  }, []);

  const refetch = useCallback(async () => {
    if (!isSignedIn) {
      _cartItems = [];
      notify();
      return;
    }
    try {
      const { data } = await userAPI.getCart();
      _cartItems = data.cartItems || [];
      notify();
    } catch {
      // silently fail — keep existing state
    }
  }, [isSignedIn]);

  // Initial fetch (once per sign-in)
  useEffect(() => {
    if (isSignedIn && !initialized.current) {
      initialized.current = true;
      refetch();
    }
    if (!isSignedIn) {
      initialized.current = false;
      _cartItems = [];
      notify();
    }
  }, [isSignedIn, refetch]);

  const isInCart = useCallback(
    (resourceId) => _cartItems.includes(resourceId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems] // re-derive when cartItems state updates
  );

  const toggle = useCallback(
    async (resourceId, addedToCart) => {
      if (!isSignedIn) return false;
      setLoading(true);
      try {
        await userAPI.toggleCart({ resourceId, addedToCart });
        if (addedToCart) {
          if (!_cartItems.includes(resourceId)) _cartItems = [..._cartItems, resourceId];
        } else {
          _cartItems = _cartItems.filter((id) => id !== resourceId);
        }
        notify();
        return true;
      } catch {
        return false;
      } finally {
        setLoading(false);
      }
    },
    [isSignedIn]
  );

  return {
    cartItems,
    count: cartItems.length,
    loading,
    isInCart,
    toggle,
    refetch,
  };
};