<template>
  <Card style="max-width: 25rem; overflow: hidden; margin: 20px auto">
    <template #title>Send a transaction</template>
    <template #content>
      <div class="card mt-3">
        <FloatLabel>
          <InputText
            class="w-full"
            id="recipient"
            v-model="recipient"
            required
          />
          <label for="recipient">Recipient address</label>
        </FloatLabel>
      </div>
      <div class="card mt-4">
        <FloatLabel>
          <InputText class="w-full" id="amount" v-model="amount" required />
          <label for="amount">Amount</label>
        </FloatLabel>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-3 mt-1">
        <Button v-if="!walletConnected" label="Send" disabled class="w-full" />
        <Button v-else @click="sendTransaction" label="Send" class="w-full" />
      </div>
    </template>
  </Card>
  <TransactionList />
  <Toast position="bottom-right" />
</template>

<script>
import TransactionList from "@/components/TransactionList";
import { mapGetters } from "vuex";
export default {
  name: "Transaction",
  components: { TransactionList },
  data() {
    return {
      recipient: "",
      amount: "",
    };
  },
  methods: {
    async sendTransaction() {
      if (!this.recipient || !this.amount) {
        this.$toast.add({
          severity: "warn",
          summary: "Warn Message",
          detail: "Please fill in all fields",
          life: 4000,
        });
        return;
      }

      const amountFloat = parseFloat(this.amount.replace(",", "."));
      const amountInWei = this.$web3.utils.toWei(
        amountFloat.toString(),
        "ether"
      );

      try {
        const accounts = await this.$web3.eth.getAccounts();
        const account = accounts[0];

        await this.$web3.eth
          .sendTransaction({
            from: account,
            to: this.recipient,
            value: amountInWei,
            gas: 21000,
            gasPrice: this.$web3.utils.toWei("40", "gwei"),
          })
          .then(() => {
            this.recipient = "";
            this.amount = "";
            this.$toast.add({
              severity: "success",
              summary: "Success Message",
              detail: "The transaction has been successfully sent!",
              life: 4000,
            });
          })
          .catch((e) => {
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: e,
              life: 4000,
            });
          });
      } catch (e) {
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: e,
          life: 4000,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["walletConnected"]),
  },
};
</script>

<style scoped></style>
