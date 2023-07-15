import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Cache from '@/utils/cache'
import { LANG_CACHE_KEY } from '@/config'
// 自动加载多语言字典文件
// const langFiles = require.context('./languages', false, /.ts$/)
const langFiles = import.meta.globEager('./languages.ts')
const langItems: any[] = []

const langs = Object.keys(langFiles).reduce((langs: { [index: string]: any }, path: string) => {
  console.log(1111, path)
  // const lang = langFiles(path).default
  // const {
  //   info: { code, name, sort },
  //   dicts
  // } = lang
  // langs[code] = { translation: dicts }
  // langItems.push({ value: code, label: name, sort: sort })
  return langs
}, {})
console.log(1111)

export const languages = langItems.sort((a, b) => a.sort - b.sort)

const fallbackLng = Cache.get(LANG_CACHE_KEY) ?? 'en'

i18n
  .use(initReactI18next) // init i18next
  .init({
    // 引入资源文件
    resources: langs,
    // 选择默认语言，选择内容为上述配置中的key，即en/zh
    fallbackLng,
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })
  .catch(() => null)
export default i18n
