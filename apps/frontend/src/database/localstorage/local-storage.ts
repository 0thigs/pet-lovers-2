export const LocalStorage = () => {
  return {
    get<Data>(key: string) {
      const data = localStorage.getItem(key)
      if (!data) return null
      return JSON.parse(data) as Data
    },

    set(key: string, data: unknown) {
      localStorage.setItem(key, JSON.stringify(data))
    },

    remove(key: string) {
      localStorage.removeItem(key)
    },
  }
}
