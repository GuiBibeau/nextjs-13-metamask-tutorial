"use client";
import Link from "next/link";
import { useState } from "react";

export const NavBar = () => {
  const [address, setAddress] = useState<string>();
  const [balance, setBalance] = useState<string>();
  const [chainId, setChainId] = useState<string>();

  const handleConnect = async () => {
    const accounts = await window.ethereum.request<string[]>({
      method: "eth_requestAccounts",
    });

    const address = Array.isArray(accounts) ? accounts[0] : null;

    if (address) {
      // get current balance
      const balance = await window.ethereum!.request<string>({
        method: "eth_getBalance",
        params: [address, "latest"],
      });

      // get current network
      const network = await window.ethereum!.request<string>({
        method: "eth_chainId",
        params: [],
      });

      // serialize wallet data as json
      const wallet = JSON.stringify({
        address,
        balance,
        network,
      });

      // set state
      setAddress(address);
      setBalance(balance ?? "0");
      setChainId(network ?? "0x0");

      console.log("address", address);
      console.log("balance", balance);
      console.log("network", network);

      // this endpoint will set a cookie. We are doing this so that server components can
      fetch(`/api/login?address=${wallet}`, { method: "POST" });
    }
  };

  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            My Dapp
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            onClick={handleConnect}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "Connect"}
          </button>
        </div>
      </div>
    </nav>
  );
};
