import * as React from 'react'
import * as Rx from 'rxjs/Rx'
import action$ from '../actions/stream'

interface Props {}
interface State {
    time: number
}

interface Action {
    type: string
    payload?: any
}


export default class Clock extends React.Component <Props, State> {

    constructor(props){
        super(props)
        this.state={time: Date.now()}
    }
    

    componentDidMount(){
        setInterval(()=> action$.next({type: 'TICK', payload: Date.now()}), 3000)
        setInterval(()=> this.setState({time: Date.now()}), 500)
    }

    render() {
        return <h4>{new Date(this.state.time).toString()}</h4>
    }
}