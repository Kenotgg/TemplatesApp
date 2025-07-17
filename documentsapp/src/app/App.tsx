import { useState } from 'react'
import viteLogo from '/vite.svg'
import '@/app/app.css';
import { useDispatch, useSelector } from 'react-redux';
import Counter from '@/features/counter/counter';
function App() {
    const [count, setCount] = useState(0)
    // const dispatch = useDispatch();
    // const cash = useSelector(state => state.cash);
    // console.log(cash)
    return (    
        <Counter></Counter>
        // <>
        //     <div>
        //         <a href="https://vite.dev" target="_blank">
        //             <img src={viteLogo} className="logo" alt="Vite logo" />
        //         </a>
        //         <a href="https://react.dev" target="_blank">
        //             <img src={viteLogo} className="logo react" alt="React logo" />
        //         </a>
        //     </div>
        //     <h1>Vite + React</h1>
        //     <div className="card">
        //         <button onClick={() => setCount((count) => count + 1)}>
        //             count is {count}
        //         </button>
        //         <p>
        //             Edit <code>src/App.tsx</code> and save to test HMR
        //         </p>
        //     </div>
        //     <p className="read-the-docs">
        //         Click on the Vite and React logos to learn more
        //     </p>
        // </>
    )
}

export default App
