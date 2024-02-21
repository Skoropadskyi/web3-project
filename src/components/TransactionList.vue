<template>
  <div class="card p-3">
    <h2>Transactions list</h2>
    <DataTable
      :value="formattedTransactions"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
    >
      <Column field="hash" header="Transaction Hash"></Column>
      <Column field="from" header="From"></Column>
      <Column field="to" header="To"></Column>
      <Column field="value" header="Value"></Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  name: "TransactionList",
  mounted() {
    this.loadTransactions();
  },
  computed: {
    transactions() {
      return this.$store.getters.transactions;
    },
    formattedTransactions() {
      return this.transactions.map((transaction) => ({
        ...transaction,
        hash: transaction.hash.substring(0, 18),
        from: `${transaction.from.substring(
          0,
          8
        )}...${transaction.from.substring(transaction.from.length - 8)}`,
        to: `${transaction.to.substring(0, 8)}...${transaction.to.substring(
          transaction.to.length - 8
        )}`,
        value: (parseFloat(transaction.value) / 1e18).toFixed(4) + " ETH",
      }));
    },
  },
  methods: {
    loadTransactions() {
      this.$store.dispatch("loadTransactions");
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}
</style>
