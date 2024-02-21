import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    walletConnected: false,
    transactions: [],
  },
  mutations: {
    setWalletConnected(state, isConnected) {
      state.walletConnected = isConnected;
    },
    setTransactions(state, transactions) {
      state.transactions = transactions;
    },
  },
  actions: {
    connectWallet({ commit }) {
      // Викликати мутацію для зміни стану
      commit("setWalletConnected", true); // Встановити підключення гаманця
    },
    async loadTransactions({ commit }) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          const currentAccount = accounts[0];
          const response = await axios.get(
            `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${currentAccount}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=I5MP1Z2EDRSSH4VNISY4RTWWTQ616ESIP5`
          );
          const transactions = response.data.result;
          commit("setTransactions", transactions);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    transactions: (state) => state.transactions,
    walletConnected: (state) => state.walletConnected,
  },
});
