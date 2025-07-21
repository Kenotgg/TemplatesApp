import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/shared/ui/counter/counterslice'

export default function Counter(){
     const count = useSelector((state: any) => state.counter.value)
     const dispatch = useDispatch() // Диспетчер

       return (
    <div>
      <div>
        <button
          aria-label="Увеличить значение"
          onClick={() => dispatch(increment())}//Обращение к Reducer с запросом на Action - increment
        >
          Увеличить
        </button>
        <span>{count}</span>
        <button
          aria-label="Уменьшить значение"
          onClick={() => dispatch(decrement())}
        >
          Уменьшить
        </button>
      </div>
    </div>
  )
}