import { v4 as uuid } from 'uuid'

export class Person {
  allowed: boolean

  id: string

  money: number

  moneyExchanged: number

  status: 'a' | 'b' | 'c' | 'd' | 'e'

  constructor (money: number, status: 'a' | 'b' | 'c' | 'd' | 'e') {
    this.allowed = true
    this.id = uuid()
    this.money = money
    this.moneyExchanged = 0
    this.status = status
  }

  toString () : string {
    return `\t{
    "allowed": ${this.allowed},
    "id": "${this.id}",
    "money": ${this.money},
    "moneyExchanged": ${this.moneyExchanged},
    "status": "${this.status}"
  },\n`
  }
}
