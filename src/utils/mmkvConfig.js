import { createMMKV } from 'react-native-mmkv'

const storage = createMMKV({
    id: 'authStorage',
})

export default storage;