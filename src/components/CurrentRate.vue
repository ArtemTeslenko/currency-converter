<script>
import { getCcyList } from "../Utils/requests";
export default {
  data() {
    return {
      avalableCcy: [],
      props: ["avalableCcy"],
      isModalActive: false,
      ccyList: [],
    };
  },
  async mounted() {
    const items = [
      { ccyName: "USD", id: "1" },
      { ccyName: "EUR", id: "2" },
      { ccyName: "UAH", id: "3" },
    ];
    !localStorage.getItem("avalableCCy") &&
      localStorage.setItem("avalableCcy", JSON.stringify(items));
    this.avalableCcy = JSON.parse(localStorage.getItem("avalableCcy"));
    const rawList = await getCcyList();
    const ccyNames = Object.keys(rawList.symbols);
    for (const item of ccyNames) {
      this.ccyList.push({
        name: `${item}`,
        wholeName: `${rawList.symbols[item]}`,
      });
    }
  },
  methods: {
    handleModalOpen() {
      this.isModalActive = !this.isModalActive;
    },
    handleAvalableCcyChange(e) {
      console.log(e.target.name);
      if (this.checkAvalableIncludes(e.target.name)) {
        //to remove item from local storage
      }
    },
    checkAvalableIncludes(value) {
      return this.avalableCcy.find((item) => item.ccyName === value);
    },
  },
};
</script>

<template>
  <div class="titleExternal">
    <div class="titleWrapper"><h2 class="title">Current rate</h2></div>
  </div>
  <div class="currentRateBox">
    <div class="mainCcyBox">
      <select v-bind:avalableCcy="avalableCcy" class="selectMainCcy">
        <option v-for="{ ccyName, id } in avalableCcy" :key="id">
          {{ ccyName }}
        </option>
      </select>
      <button type="button" class="ccyAdd" v-on:click="handleModalOpen">
        &#43;
      </button>
    </div>
    <Teleport to="body">
      <div class="modal" v-if="isModalActive">
        <div class="modalWrapper">
          <ul>
            <li v-for="{ name, wholeName } in ccyList" :key="name">
              <div class="listItemDecoration">
                <span class="shortNameDecoration">{{ name }}: </span
                >{{ wholeName }}
                <button
                  v-if="!checkAvalableIncludes(name)"
                  v-bind:name="name"
                  type="button"
                  class="ccyListAdd"
                  v-on:click="handleAvalableCcyChange"
                >
                  &#43;</button
                ><button
                  v-else
                  v-bind:name="name"
                  type="button"
                  class="ccyListRemove"
                  v-on:click="handleAvalableCcyChange"
                >
                  &#8722;
                </button>
              </div>
            </li>
          </ul>
          <button @click="handleModalOpen" class="modalClose">&#x2715;</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.title {
  font-size: 20px;
}

.titleExternal {
  border-bottom: 1px solid #f66666;
}
.titleWrapper {
  padding: 16px 8px;
}
.currentRateBox {
  padding: 16px 8px;
}

select {
  margin-right: 8px;
  color: #2f2f2f;
  background-color: rgba(238, 238, 252, 0.7721682422969187);
  border: 1px solid #f66666;
  border-radius: 4px;
}

.ccyAdd,
.ccyListAdd,
.ccyListRemove,
.modalClose {
  width: 26px;
  height: 26px;
  font-size: 16px;
  color: #2f2f2f;
  background-color: rgba(238, 238, 252, 0.7721682422969187);
  border: 1px solid #f66666;
  border-radius: 50%;
  transition: all 350ms;
}

.ccyAdd:hover,
.ccyListAdd:hover,
.ccyListRemove:hover,
.modalClose:hover {
  border-color: #f05555;
  transform: scale(1.1);
}
.modalClose {
  position: fixed;
  top: 8px;
  right: 16px;
}
.mainCcyBox {
  display: flex;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(160, 147, 147, 0.5);
}
.modal {
  overflow: auto;
  position: fixed;
  top: 2.5%;
  left: 50%;
  transform: translateX(-50%);
  height: 95vh;
  padding: 32px 16px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: -5px -5px 15px 1px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px 1px rgba(0, 0, 0, 0.2);
}

.modalWrapper {
  position: relative;
  height: 95vh;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  color: #2f2f2f;
}
.listItemDecoration {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.shortNameDecoration {
  padding: 8px;
}

li {
  border-bottom: 1px solid #f66666;
}
</style>
