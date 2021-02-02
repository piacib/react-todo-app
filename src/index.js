import React from 'react';
import ReactDOM from 'react-dom';
import './todo.css';

import reportWebVitals from './reportWebVitals';


class List extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        newItem: '',
        list: ["Study","Clean Room","Run","Meet with Dave","Call Mom"],
        completedList: [],
        selectedItem: 0,
    };
    
    this.selectItem.bind(this)
    this.deselectItem.bind(this)
}

    handleChange = (e) => {
        this.setState({
            newItem: e.target.value,
        });
        e.preventDefault();
    };
    handleSubmit = (e) => {
        this.setState({
            list: this.state.list.concat(this.state.newItem),
            newItem: '',
        });
        
        e.preventDefault();
    };
    handleClick = (e) => {
        this.setState({
            filteredList: this.state.list.filter((x,idx) => idx !== e.target.value),
            selectedItem: e.target.value, 
        });
        e.preventDefault();
    };
    handleDeleteSubmit = (e) => {
        this.setState({list: this.state.filteredList})
        e.preventDefault();
    };
    handleCompleteSubmit = (e) => {
        this.setState({
            list: this.state.filteredList,
            completedList: this.state.completedList.concat(this.state.list.filter((x,idx) => idx === this.state.selectedItem)), 
        });
        e.preventDefault();
    }
    handleToDoClick = (e) => {
        this.selectItem(e);
        this.handleClick(e);
    }
    selectItem = (e) => {
        this.deselectItem(e);
        document.getElementById('listItem' + e.target.value).className ='selected';
        console.log('listItem' + e.target.value)   
    }
    deselectItem =(e) => {
        let selected = document.getElementsByClassName('selected')
        if (selected.length > 0) {
            selected[0].classList.remove('selected');

        }
    }
    render() {
    return (
        <div className='container'>
            <div className='item-a'>
                <form id='addItem'  onSubmit={this.handleSubmit.bind(this)}>
                    <input className='add-item' type='text' value={this.state.newItem} onChange={this.handleChange.bind(this)} placeholder="add ToDo item"/>
                    {/* <input type='submit' value='Submit'/> */}
                </form>
            </div>

            <div className='item-b'>
            <ul>
                {this.state.list.map((x,idx) => 
                <li key={idx} value={idx} id={'listItem' + idx} onClick={this.handleToDoClick.bind(this)}>
                    {x}
                </li>)}
            </ul>
            <div className="buttonDisplay">
            <input className="button" type='button' value='Remove' onClick={this.handleDeleteSubmit.bind(this)}></input>
            <input className="button" type='button' value='Complete' onClick={this.handleCompleteSubmit.bind(this)}></input>
          </div>
            </div>
            
            <ul className='item-c'>
                {this.state.completedList.map((x,idx) => 
                <li key={idx} value={idx}>
                    {x}
                </li>)}
            </ul>
        
        </div>
    )
   
};
}


ReactDOM.render(
    <React.StrictMode>
      <List />
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
  