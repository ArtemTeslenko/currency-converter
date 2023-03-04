<script>
import ccyOptions from "../../ccyOptions.json";
import ToggleButton from "./ToggleButton.vue";
import CurrentRate from "./CurrentRate.vue";
import { getBasicRate, getConvertedAmount } from "../Utils/requests";
export default {
  data() {
    return {
      opts: ccyOptions,
      fromCcyValue: "USD",
      toCcyValue: "BTC",
      props: ["opts", "mainToSecondary"],
      mainToSecondary: true,
      rate: 0,
      amount: null,
      convertedAmount: null,
      err: null,
      compare: null,
    };
  },
  async mounted() {
    await this.fetchCurrent();
  },
  methods: {
    async fetchCurrent() {
      const ccyRelationInfo = await getBasicRate(
        this.toCcyValue,
        this.fromCcyValue,
        this.mainToSecondary
      );
      this.rate = ccyRelationInfo.info.rate;
    },

    async toggleDirection() {
      this.mainToSecondary = !this.mainToSecondary;

      await this.fetchCurrent();
      this.amount && this.handleAmountInput();
    },

    async handleCcyChange() {
      try {
        await this.fetchCurrent();
        this.amount && this.handleAmountInput();
        this.err = null;
      } catch (error) {
        this.err = "Something went wrong, please try again.";
      }
    },
    async handleAmountInput() {
      try {
        const convertedResult = await getConvertedAmount(
          this.toCcyValue,
          this.fromCcyValue,
          this.mainToSecondary,
          this.amount
        );
        this.convertedAmount = convertedResult.result;
        this.err = null;
      } catch {
        this.err = "Something went wrong, please try again.";
      }

      try {
        const convertedResult = await getConvertedAmount(
          "USD",
          this.fromCcyValue,
          this.mainToSecondary,
          this.amount
        );
        this.compare = convertedResult.result;
        this.err = null;
      } catch (error) {
        this.err = "Something went wrong, please try again.";
      }
    },
  },
  // computed: {
  //   firstSelectVal: {
  //     get() {
  //       return this.mainToSecondary ? this.fromCcyValue : this.toCcyValue;
  //     },
  //     set(value) {
  //       this.mainToSecondary
  //         ? (this.fromCcyValue = value)
  //         : (this.toCcyValue = value);
  //     },
  //   },
  // },
  components: { ToggleButton, CurrentRate },
};
</script>

<template>
  <div class="inputContainer">
    <div class="group">
      <select
        v-bind:opts="opts"
        class="firstCcy"
        id="firstCcy"
        v-model="fromCcyValue"
        v-on:change="handleCcyChange"
      >
        <option v-for="{ id, ccyName } in opts" :key="id">
          {{ ccyName }}
        </option>
      </select>
      <ToggleButton
        v-bind:mainToSecondary="mainToSecondary"
        type="button"
        class="into"
        v-on:toggleDirection="toggleDirection"
      />
      <select
        class="secondCcy"
        id="secondCcy"
        v-model="toCcyValue"
        v-on:change="handleCcyChange"
      >
        <option v-for="{ id, ccyName } in opts" :key="id">
          {{ ccyName }}
        </option>
      </select>
      <input
        type="number"
        name="ccyInput"
        id="ccyInput"
        placeholder="Please write your sum"
        v-model="amount"
        v-on:input="handleAmountInput"
      />
    </div>
    <p class="err" v-if="err">
      {{ err }}
    </p>
    <p class="equation">
      Current rate is 1 {{ mainToSecondary ? fromCcyValue : toCcyValue }} =
      {{ rate }} {{ mainToSecondary ? toCcyValue : fromCcyValue }}
    </p>
    <p class="compare">
      The limit of requested amount is 10'000 USD<span v-if="compare"
        >, your sum is equal to: {{ compare }} USD
      </span>
    </p>
    <p class="converted" v-if="!err && compare < 10000 && amount">
      In line with your request: {{ amount }}
      {{ mainToSecondary ? fromCcyValue : toCcyValue }} = {{ convertedAmount }}
      {{ mainToSecondary ? toCcyValue : fromCcyValue }}
    </p>
  </div>
  <CurrentRate />
</template>

<style scoped>
.inputContainer {
  display: flex;
  padding: 16px 8px;
  width: 100%;
  flex-direction: column;
}

.group {
  display: flex;
  margin-bottom: 8px;
}

select {
  margin-right: 8px;
  color: #2f2f2f;
  background-color: rgba(238, 238, 252, 0.7721682422969187);
  border: 1px solid #f66666;
  border-radius: 4px;
}

input {
  width: 100%;
  color: #2f2f2f;
  background-color: rgba(238, 238, 252, 0.7721682422969187);
  border: 1px solid #f66666;
  border-radius: 4px;
}

.equation {
  margin-bottom: 10px;
  font-size: 16px;
  color: #2f2f2f;
}

.converted {
  margin-bottom: 10px;
}

.compare {
  margin-bottom: 10px;
}

.err {
  margin-bottom: 10px;
  color: #f66666;
}
</style>
