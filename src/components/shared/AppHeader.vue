<template>
  <div class="flex justify-content-center" style="background-color: #ffffff">
    <Menubar>
      <template #start>
        <img src="@/assets/logo-ethereum.png" alt="Eth" />
      </template>
      <template #end>
        <div class="flex align-items-center" v-if="connected">
          <div class="pr-3">Balance: {{ balance }} {{ currency }}</div>
          <Button :label="maskedAddress" raised />
        </div>
        <Button v-else label="Connect" raised @click="connectWallet" />
      </template>
    </Menubar>
  </div>
  <Toast position="bottom-right" />
</template>

<script>
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import Toast from "primevue/toast";
export default {
  name: "AppHeader",
  components: { Menubar, Button, Toast },
  data() {
    return {
      connected: false,
      account: null,
      balance: null,
      currency: "ETH",
    };
  },
  created() {
    this.connectWallet();
  },
  methods: {
    async connectWallet() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          this.account = accounts[0];
          this.connected = true;
          this.$store.dispatch("connectWallet");
          await this.getBalance();
        } catch (error) {
          this.$toast.add({
            severity: "error",
            summary: "Error Message",
            detail: error.message,
            life: 4000,
          });
        }
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: "Please install MetaMask!",
          life: 4000,
        });
      }
    },
    async getBalance() {
      try {
        const balance = await this.$web3.eth.getBalance(this.account);
        const balanceInEther = this.$web3.utils.fromWei(balance, "ether");
        this.balance = parseFloat(balanceInEther).toFixed(4);
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: error,
          life: 4000,
        });
      }
    },
  },
  computed: {
    maskedAddress() {
      if (this.connected && this.account) {
        const firstFour = this.account.substring(0, 4);
        const lastFour = this.account.substring(this.account.length - 4);
        return `${firstFour}...${lastFour}`;
      }
      return "";
    },
  },
};
</script>

<style scoped>
.p-menubar {
  max-width: 1240px;
  width: 100%;
  border: none;
}
</style>
