import {ActionType , div , mult , numberReducer , sub , sum} from "./someTasks";

test('sum of two number' , () => {
    // 1. тестовые данные:
    const a: number = 10
    const b: number = 20
    //2. выполнение тестируемого кода
    const result = sum(a , b)
    //3. проверка результата
    expect(result).toBe(30)
})

test('subtract of two number' , () => {
 expect(sub(20,10)).toBe(10)
})

test('multiply two numbers' , () => {
    expect(mult(20,10)).toBe(200)
})

test('divide the number' , () => {
    expect(div(20,10)).toBe(2)
})

test('sum using numberReducer',()=>{
    const salary: number = 1000
    const action: ActionType = {
        type:'SUM',
        num:300
    }
    const result = numberReducer(salary,action)
    expect(result).toBe(1300)
})
test('sub using numberReducer',()=>{
    const salary: number = 1000
    const action: ActionType = {
        type:'SUB',
        num:300
    }
    const sum = numberReducer(salary,action)
    expect(sum).toBe(700)
})
test('mult using numberReducer',()=>{
    const salary: number = 1000
    const action: ActionType = {
        type:'MULT',
        num:3
    }
    const mult = numberReducer(salary,action)
    expect(mult).toBe(3000)
})
test('div using numberReducer',()=>{
    const salary: number = 1000
    const action: ActionType = {
        type:'DIV',
        num:2
    }
    const div = numberReducer(salary,action)
    expect(div).toBe(500)
})
