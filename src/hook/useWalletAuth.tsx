import { useAccount, useSignMessage } from "wagmi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAddress } from "viem";
import { walletAuth, walletVerifyAuth } from "@/redux/slices/walletSlice";
import { getUserProfile } from "@/redux/slices/authSlice";

export function useWalletAuth() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const dispatch = useDispatch<AppDispatch>();

  const loginWithWallet = async () => {
    if (!address) throw new Error("No wallet connected");

    try{
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
      if (verifyRes.accessToken) {
        localStorage.setItem("token", verifyRes.accessToken);
      }

      if(verifyRes.user){
        dispatch(getUserProfile(verifyRes.user._id))
      }

      return verifyRes.user;
    } catch(error){
      console.log(error)
    }

    
  };

  return { loginWithWallet };
}
