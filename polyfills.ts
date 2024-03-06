import { Buffer } from 'buffer'
import process from 'process'

window.global = window
window.process = process
window.Buffer = Buffer
console.log(1234556)
