import React, { Component } from 'react';
import Header from './Header';
import { snackBarEvents } from './emitter';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isVisible: false, message: '', type: ''}
        this.snackbarTimer = null;
    }

    componentDidMount() {
        snackBarEvents.on('show', ({ message, type }) => {
           if (this.snackbarTimer) {
           clearTimeout(this.snackbarTimer);
            }
            this.setState({isVisible: true, message, type});
            this.snackbarTimer = setTimeout(() => {
                this.setState({isVisible: false, message: '', type: ''})
                this.snackbarTimer = null;
            }, 4000);
           }
        );
    }

  render() {
  const snackBarBackground = this.state.type === 'error' ? 'red' : 'grey';
    return (
    <div className="container">
            <Header />
             {this.props.children}

      {this.state.isVisible && (
      <div id="toast-container">
         <div className={`toast rounded ${snackBarBackground} `}> {this.state.message} </div>
         </div>
      )}
    </div>
    )
  }
}

export default App;