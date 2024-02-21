<template>
  <div class="home" style="padding-bottom: 60px">
    <Transaction />
  </div>
</template>

<script>
import Transaction from "@/components/Transaction";
export default {
  name: "HomeView",
  components: { Transaction },
};
</script>
