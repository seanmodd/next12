// import {useRecoilState} from "recoil"
import {Counter} from "../../../../pages/dashboard/one"

function Count (props){
    const [counter, setCounter] = useRecoilState(Counter)


    return <button onClick={() => {setCounter(counter + 1)}}>Count</button>
}

export default Count
