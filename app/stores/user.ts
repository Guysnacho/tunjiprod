export const useUserStore = defineStore('user', () => {
  const id = ref('')
  function setId(newId?: string) {
    id.value = newId ?? ''
  }

  return { uid: id, setId }
})
