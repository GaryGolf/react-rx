import * as React from 'react'
import action$ from '../actions/stream'
import worx from '../actions/worx'
import * as Rx from '@reactivex/rxjs'

interface Props {}
interface State {
    time: number
}

interface Action {
    type: string
    payload?: any
}


export default class Clock extends React.Component <Props, State> {

    private int: number

    constructor(props){
        super(props)
        this.state={time: Date.now()}
    }
    

    componentDidMount(){
      
       this.int = window.setInterval(()=>  worx.postMessage({type: 'TICK', payload: Date.now()}), 1000)
        worx.addEventListener('message', event => {
            if(event.data.type == 'TICK') this.setState({time: event.data.payload})
        }, false)
    }

    componentWillUnmount(){
        window.clearInterval(this.int)
    }

    render() {
        
        return <h4>{new Date(this.state.time).toString()}</h4>
    }
}