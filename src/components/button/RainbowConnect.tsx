import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

type RainbowConnectProps = {
  disabled?: boolean;
};

export const RainbowConnect: React.FC<RainbowConnectProps> = ({
  disabled = false,
}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
                width: "100%",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={disabled ? undefined : openConnectModal}
                    type="button"
                    disabled={disabled}
                    className={`w-full px-4 py-2 rounded-xl font-medium border transition-colors
                      ${
                        disabled
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed border-gray-400"
                          : "bg-transparent text-white border-white/30 hover:border-white hover:bg-white/10"
                      }`}
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={disabled ? undefined : openChainModal}
                    type="button"
                    disabled={disabled}
                    className={`w-full px-4 py-2 rounded-xl font-medium border transition-colors
                      ${
                        disabled
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed border-gray-400"
                          : "bg-transparent text-red-500 border-red-500 hover:bg-red-500/10"
                      }`}
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex gap-3 w-full">
                  {/* Chain Button */}
                  <button
                    onClick={disabled ? undefined : openChainModal}
                    type="button"
                    disabled={disabled}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors w-full
                      ${
                        disabled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
                          : "bg-transparent text-white border-white/30 hover:border-white hover:bg-white/10"
                      }`}
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <div
                        className="w-4 h-4 rounded-full overflow-hidden"
                        style={{ background: chain.iconBackground }}
                      >
                        <img
                          alt={chain.name ?? "Chain icon"}
                          src={chain.iconUrl}
                          className="w-4 h-4"
                        />
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={disabled ? undefined : openAccountModal}
                    type="button"
                    disabled={disabled}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors w-full
                      ${
                        disabled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
                          : "bg-transparent text-white border-white/30 hover:border-white hover:bg-white/10"
                      }`}
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
