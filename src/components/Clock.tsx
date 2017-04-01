import * as React from 'react'
import action$ from '../actions/stream'
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

    private subscribtion: Rx.Subscription

    constructor(props){
        super(props)
        this.state={time: Date.now()}
    }
    

    componentDidMount(){
        this.subscribtion = Rx.Observable
            .interval(3000)
            .mapTo({type: 'TICK', payload: this.whatTimeIsIt()})
            .subscribe(action$)
        setInterval(()=> this.setState({time: Date.now()}), 500)
    }

    componentWillUnmount(){
        this.subscribtion.unsubscribe()
    }

    whatTimeIsIt(): number{
        return Date.now()
    }

    render() {
        return <h4>{new Date(this.state.time).toString()}</h4>
    }
}