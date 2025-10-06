import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, Copy, ExternalLink } from "lucide-react";
import { useWalletAuth } from "@/hook/useWalletAuth";
import { useAccount, useDisconnect } from "wagmi";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { logout } from "@/redux/slices/authSlice";
import {setWalletAddress} from "@/redux/slices/walletSlice";

// Import your Avatar components (adjust path as needed)
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type RainbowConnectProps = {
  disabled?: boolean;
};

export const RainbowConnect: React.FC<RainbowConnectProps> = ({
  disabled = false,
}) => {
  const { loginWithWallet } = useWalletAuth();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const dispatch = useAppDispatch();

  const {
      user: { isAuthenticated },
    } = useAppSelector((state) => state.auth);

  
  
    const handleLogin = async () => {
      try {
        const user = await loginWithWallet();
        return user;

      } catch (err) {
        console.error("Wallet login failed:", err);
      }
    };
  
    const handleLogout = () => {
      // Disconnect wallet
      disconnect();
      // Clear redux + localStorage
      dispatch(logout());
    };


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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

          useEffect(() => {
            if (!isConnected) {
              handleLogin()
            } 
          }, [isConnected]);

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
                    onClick={
                      async () => 
                      {
                        const response = disabled ? undefined : openConnectModal()
                        await response;
                        if(response !== undefined){
                          setWalletAddress(account.address);
                          handleLogin()
                        }
                      }
                    }
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
                <div className="relative" ref={dropdownRef}>
                  {/* Avatar Button */}
                  <button
                    onClick={disabled ? undefined : () => setIsDropdownOpen(!isDropdownOpen)}
                    type="button"
                    disabled={disabled}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors
                      ${
                        disabled
                          ? "bg-gray-300 cursor-not-allowed border-gray-300"
                          : "bg-transparent border-white/30 hover:border-white hover:bg-white/10"
                      }`}
                  >
                    <Avatar className="w-7 h-7 lg:w-8 lg:h-8 border border-secondary-200/50">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                      <AvatarFallback className="bg-secondary-200 text-white text-xs font-medium">
                        {account.displayName?.slice(0, 2).toUpperCase() || "GA"}
                      </AvatarFallback>
                    </Avatar>
                    
                    <span className="text-white text-sm font-medium hidden sm:block">
                      {truncateAddress(account.address)}
                    </span>
                    
                    <ChevronDown 
                      size={16} 
                      className={`text-white transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-black-400 border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden">
                      {/* User Info Header */}
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border border-secondary-200/50">
                            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                            <AvatarFallback className="bg-secondary-200 text-white text-sm font-medium">
                              {account.displayName?.slice(0, 2).toUpperCase() || "GA"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-medium text-sm">
                              {account.displayName}
                            </p>
                            {account.displayBalance && (
                              <p className="text-white/60 text-xs">
                                {account.displayBalance}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Wallet Address */}
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white/60 text-xs mb-1">Wallet Address</p>
                            <p className="text-white font-mono text-sm">
                              {truncateAddress(account.address)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => copyToClipboard(account.address)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="Copy address"
                            >
                              <Copy size={14} className="text-white/60" />
                            </button>
                            <button
                              onClick={() => window.open(`https://etherscan.io/address/${account.address}`, '_blank')}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="View on explorer"
                            >
                              <ExternalLink size={14} className="text-white/60" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Chain Info */}
                      <div className="p-4 border-b border-white/10">
                        <button
                          onClick={disabled ? undefined : openChainModal}
                          disabled={disabled}
                          className="flex items-center justify-between w-full hover:bg-white/5 p-2 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {chain.hasIcon && chain.iconUrl && (
                              <div
                                className="w-5 h-5 rounded-full overflow-hidden"
                                style={{ background: chain.iconBackground }}
                              >
                                <img
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  className="w-5 h-5"
                                />
                              </div>
                            )}
                            <div className="text-left">
                              <p className="text-white/60 text-xs">Network</p>
                              <p className="text-white text-sm font-medium">{chain.name}</p>
                            </div>
                          </div>
                          <ChevronDown size={14} className="text-white/60 -rotate-90" />
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="p-2">
                        <button
                          onClick={() => {
                            openAccountModal();
                            handleLogout();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 w-full p-3 hover:bg-red-500/10 rounded-lg transition-colors text-red-400 hover:text-red-300"
                        >
                          <LogOut size={16} />
                          <span className="text-sm font-medium">Disconnect</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};