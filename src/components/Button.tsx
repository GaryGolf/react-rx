import * as React from 'react'
import * as Rx from 'rxjs/Rx'
import action$ from '../actions/stream'

interface Props {}

interface Action {
    type: string
    payload?: any
}


export default class Button extends React.Component <Props, null> {

    private click$
    componentDidMount(){
        action$.subscribe(x => console.log(x))
    }

    render() {
        return (
            <button
                onClick={()=>action$.next({type: 'CLICK'})}>
                Time
            </button>
        )
    }
}