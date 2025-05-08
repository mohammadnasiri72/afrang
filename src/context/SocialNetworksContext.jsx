"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";

export const SocialNetworksContext = createContext();

export const SocialNetworksProvider = ({ children }) => {
  const [socialNetworks, setSocialNetworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const isRequested = useRef(false);

  useEffect(() => {
    const fetchSocialNetworks = async () => {
      if (isRequested.current) return;
      isRequested.current = true;

      try {
        const response = await axios.get(`${mainDomain}/api/Item`, {
          params: {
            TypeId: 1015,
            LangCode: "fa",
            CategoryIdArray: 3226,
          },
        });

        if (response.data) {
          const sortedNetworks = response.data.sort(
            (a, b) => b.priority - a.priority
          );
          setSocialNetworks(sortedNetworks);
        }
      } catch (error) {
        // Only log errors that are not aborted requests
        if (error.code !== 'ECONNABORTED') {
          console.error("Error fetching social networks:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSocialNetworks();
  }, []);

  return (
    <SocialNetworksContext.Provider value={{ socialNetworks, loading }}>
      {children}
    </SocialNetworksContext.Provider>
  );
};

export const useSocialNetworks = () => {
  const context = useContext(SocialNetworksContext);
  if (!context) {
    throw new Error('useSocialNetworks must be used within a SocialNetworksProvider');
  }
  return context;
}; 