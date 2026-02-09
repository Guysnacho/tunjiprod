export const useUserStore = defineStore('user', {
  state: () => {
    return { id: '',  }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})