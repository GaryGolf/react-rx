import * as React from 'react'
import action$ from '../actions/stream'

import * as Rx from 'rxjs/Rx'



interface Props {}

interface State {
    time: number[]
}

export default class List extends React.Component <Props, State> {

    private time
    private sub1
    private sub2

    constructor(props){
        super(props)

        this.time = Date.now()
        this.state = {time: []}
    }

    componentDidMount(){

       
        this.sub1 = (action$ as any).subscribe(action => {
            if(action.type !== 'TICK') return
            this.time = action.payload
        })

        this.sub2 = (action$ as any).subscribe(action => {
            if(action.type !== 'CLICK') return
            console.log('xlixl')
            const time =this.state.time.length ? [this.time,...this.state.time] : [this.time]
            this.setState({time})
        })
    }

    componentWillUnmount(){
        this.sub1.unsubscribe()
        this.sub2.unsubscribe()
    }

    render() {

        const list = !this.state.time.length 
            ? '..empty' 
            : this.state.time.map((t,i) => (<div key={i}>{new Date(t).toString()}</div>))
        return (
            <div>
                 {list}
            </div>
        )
    }
}