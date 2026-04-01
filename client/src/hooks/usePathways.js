/**
 * usePathways — manages pathway subscription state
 *
 * Provides:
 *   subscribedIds  : string[]   — pathway IDs the user is subscribed to
 *   loading        : boolean
 *   isSubscribed   : (id) => boolean
 *   toggle         : (id, shouldSubscribe) => Promise<boolean>
 *   refetch        : () => Promise<void>
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Module-level cache shared across all instances
let _subscribedIds = [];
let _listeners = [];

function notify() {
  _listeners.forEach((fn) => fn([..._subscribedIds]));
}

export const usePathways = () => {
  const { isSignedIn } = useAuth();
  const [subscribedIds, setSubscribedIds] = useState(_subscribedIds);
  const [loading, setLoading] = useState(false);
  const initialized = useRef(false);

  // Subscribe to module-level state updates
  useEffect(() => {
    const listener = (ids) => setSubscribedIds(ids);
    _listeners.push(listener);
    return () => {
      _listeners = _listeners.filter((l) => l !== listener);
    };
  }, []);

  const refetch = useCallback(async () => {
    if (!isSignedIn) {
      _subscribedIds = [];
      notify();
      return;
    }
    try {
      const { data } = await userAPI.getPathways();
      _subscribedIds = data.pathwayIds || [];
      notify();
    } catch {
      // silently fail
    }
  }, [isSignedIn]);

  // Initial fetch
  useEffect(() => {
    if (isSignedIn && !initialized.current) {
      initialized.current = true;
      refetch();
    }
    if (!isSignedIn) {
      initialized.current = false;
      _subscribedIds = [];
      notify();
    }
  }, [isSignedIn, refetch]);

  const isSubscribed = useCallback(
    (pathwayId) => _subscribedIds.includes(pathwayId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subscribedIds]
  );

  /**
   * @param {string} pathwayId
   * @param {boolean} subscribed — true = subscribe, false = unsubscribe
   * @returns {Promise<boolean>}
   */
  const toggle = useCallback(
    async (pathwayId, subscribed) => {
      if (!isSignedIn) return false;
      setLoading(true);
      try {
        await userAPI.togglePathway({ pathwayId, subscribed });
        if (subscribed) {
          if (!_subscribedIds.includes(pathwayId))
            _subscribedIds = [..._subscribedIds, pathwayId];
        } else {
          _subscribedIds = _subscribedIds.filter((id) => id !== pathwayId);
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
    subscribedIds,
    loading,
    isSubscribed,
    toggle,
    refetch,
  };
};