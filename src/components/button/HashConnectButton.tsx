"use client";

import React, { useEffect, useState } from "react";
import { HashConnect, HashConnectTypes } from "@hashgraph/hashconnect";
import { MainButton } from ".";

export default function HashConnectButton() {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [hashconnect, setHashconnect] = useState<HashConnect | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    localStorage.removeItem("hashconnectData");

    const initHashConnect = async () => {
      try {
        const appMetadata: HashConnectTypes.AppMetadata = {
          name: "Quiva DApp (Testnet)",
          description: "Connect to HashPack",
          icon: "https://avatars.githubusercontent.com/u/31002956",
          url: window.location.origin,
        };

        const hc = new HashConnect();
        const initData = await hc.init(appMetadata, "testnet", false);

        const pairingListener = (pairingData: any) => {
          console.log(" Pairing event:", pairingData);
          if (pairingData.accountIds?.[0]) {
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
          }
        };
        console.log("Init data:", initData);
        hc.pairingEvent.on(pairingListener);
        setHashconnect(hc);
      } catch (error) {
        console.error("Error initializing HashConnect:", error);
      }
    };

    initHashConnect();

    return () => {};
  }, []);

  const handleConnect = async () => {
    if (!hashconnect) return;

    setIsConnecting(true);
    try {
      await hashconnect.connectToLocalWallet();
    } catch (error) {
      console.error("Connection error:", error);
      localStorage.removeItem("hashconnectData");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem("hashconnectData");
    setAccountId(null);
  };

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
        <MainButton
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isConnecting ? "Connecting..." : "Connect with HashPack"}
        </MainButton>
      )}
    </div>
  );
}
