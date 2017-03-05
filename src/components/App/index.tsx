import * as React from 'react'
import Button from '../Button'
import List from '../List'
import Clock from '../Clock'

// const style = require('./App.css')

interface Props {
//   todos: TodoItemData[];
//   actions: typeof TodoActions;
};

interface State {
  /* empty */
}

export default class App extends React.Component<Props, State>{

  render() {
    return  (
        <div>
            <h1> Hello React </h1> 
            <Clock/>
            <Button/>
            <List/>
        </div>
    
    )
  }
}