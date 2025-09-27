import { useAccount, useSignMessage } from "wagmi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAddress } from "viem";
import { walletAuth, walletVerifyAuth } from "@/redux/slices/walletSlice";

export function useWalletAuth() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const dispatch = useDispatch<AppDispatch>();

  const loginWithWallet = async () => {
    console.log({ address });
    if (!address) throw new Error("No wallet connected");

    const walletAddress = getAddress(address) as `0x${string}`;

    const msgRes = await dispatch(walletAuth({ walletAddress })).unwrap();
    const message = msgRes.message;

    const signature = await signMessageAsync({
      message,
      account: walletAddress,
    });

    const verifyRes = await dispatch(
      walletVerifyAuth({ walletAddress, message, signature })
    ).unwrap();
    if (verifyRes.token) {
      localStorage.setItem("token", verifyRes.token);
    }

    return verifyRes.user;
  };

  return { loginWithWallet };
}
