"use client";

import React, { useEffect, useState } from "react";
import { HashConnect, HashConnectTypes } from "@hashgraph/hashconnect";

export default function HashConnectButton() {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [hashconnect, setHashconnect] = useState<HashConnect | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const clearCorruptedData = () => {
    console.log("🧹 Clearing corrupted HashConnect data...");
    localStorage.removeItem("hashconnectData");
    localStorage.removeItem("hashconnectData_TESTNET");
    localStorage.removeItem("hashconnectData_MAINNET");
    localStorage.removeItem("hashconnectData_PREVIEWNET");
    setAccountId(null);
  };

  useEffect(() => {
    let foundExtensionListener:
      | ((walletMetadata: HashConnectTypes.WalletMetadata) => void)
      | undefined;
    let pairingListener: ((pairingData: any) => void) | undefined;
    let connectionStatusListener: ((status: any) => void) | undefined;
    let hc: HashConnect;

    const initHashConnect = async () => {
      try {
        console.log("Initializing HashConnect...");

        const appMetadata: HashConnectTypes.AppMetadata = {
          name: "Quiva DApp (Testnet)",
          description: "Connect to HashPack",
          icon: "https://avatars.githubusercontent.com/u/31002956",
          url: window.location.origin,
        };

        hc = new HashConnect();

        clearCorruptedData();

        console.log("🔄 Fresh initialization...");
        const initData = await hc.init(appMetadata, "testnet", false);
        console.log("ashConnect initialized:", initData);

        foundExtensionListener = (
          walletMetadata: HashConnectTypes.WalletMetadata
        ) => {
          console.log("🔍 Found wallet extension:", walletMetadata);
        };

        pairingListener = (pairingData: any) => {
          console.log("Pairing event received:", pairingData);

          if (pairingData.accountIds && pairingData.accountIds.length > 0) {
            const accId = pairingData.accountIds[0];
            setAccountId(accId);

            localStorage.setItem(
              "hashconnectData",
              JSON.stringify({
                topic: pairingData.topic,
                encryptionKey: initData.encryptionKey,
                accountIds: pairingData.accountIds,
              })
            );
            console.log("Connected and saved:", accId);
          }
        };

        connectionStatusListener = (status: any) => {
          console.log("📡 Connection status:", status);
        };

        hc.foundExtensionEvent.once(foundExtensionListener);
        hc.pairingEvent.on(pairingListener);
        hc.connectionStatusChangeEvent.on(connectionStatusListener);

        setHashconnect(hc);

        const savedData = localStorage.getItem("hashconnectData");
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            if (
              parsedData.topic &&
              parsedData.encryptionKey &&
              parsedData.accountIds
            ) {
              console.log("🔄 Attempting reconnection...");
              await hc.connect(parsedData.topic, parsedData.encryptionKey);
              setAccountId(parsedData.accountIds[0]);
              console.log(
                "Reconnected successfully:",
                parsedData.accountIds[0]
              );
            }
          } catch (error) {
            console.error("Reconnection failed, clearing data:", error);
            clearCorruptedData();
          }
        }
      } catch (error) {
        console.error("❌ Error initializing HashConnect:", error);
        clearCorruptedData();
      }
    };

    initHashConnect();

    return () => {
      if (hc) {
        if (foundExtensionListener) {
          hc.foundExtensionEvent.off(foundExtensionListener);
        }
        if (pairingListener) {
          hc.pairingEvent.off(pairingListener);
        }
        if (connectionStatusListener) {
          hc.connectionStatusChangeEvent.off(connectionStatusListener);
        }
      }
    };
  }, []);

  const handleConnect = async () => {
    if (!hashconnect) {
      console.error("HashConnect not initialized");
      return;
    }

    setIsConnecting(true);
    try {
      console.log("🔗 Connecting to local wallet...");
      await hashconnect.connectToLocalWallet();
    } catch (error) {
      console.error("Connection error:", error);
      clearCorruptedData();

      alert(
        "Failed to connect to HashPack. Please make sure HashPack is installed and try again."
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    if (hashconnect && accountId) {
      const savedData = localStorage.getItem("hashconnectData");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (parsedData.topic) {
            hashconnect.disconnect(parsedData.topic);
          }
        } catch (error) {
          console.error("Error during disconnect:", error);
        }
      }
    }
    clearCorruptedData();
    console.log("Disconnected from HashPack");
  };

  console.log("Current state:", {
    accountId,
    isConnecting,
    hashconnect: !!hashconnect,
  });

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      {accountId ? (
        <div className="text-center">
          <p className="text-green-600 mb-2">Connected: {accountId}</p>
          <button
            onClick={handleDisconnect}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isConnecting ? "Connecting..." : "Connect HashPack"}
        </button>
      )}
    </div>
  );
}
