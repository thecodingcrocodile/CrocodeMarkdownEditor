require('../sass/main.sass');

const defaultFile = './common/default.txt';

import { ipcRenderer } from 'electron';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Inspector from './Inspector';
import Editor from './Editor';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  componentWillMount() {
    document.addEventListener('drop', function(e) {
      const file = e.dataTransfer.files[0].path
      ipcRenderer.send('open', file);
      e.preventDefault();
      e.stopPropagation();
    });
    document.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  componentDidMount() {
    ipcRenderer.send('open', defaultFile);
    ipcRenderer.on('content', (e, content, title) => {
      document.title = `Crocode Markdown Editor - ${title ? title : 'Untitled'}`
      this.setState({ content })
    });

    ipcRenderer.on('getContentForSave', () => {
      console.log('sending content');
      ipcRenderer.send('contentForSave', this.state.content)
    })

    ipcRenderer.on('updateTitle', (e, title) => document.title = `Crocode Markdown Editor - ${title ? title : 'Untitled'}`);
  }

  handleChange = e => {
    this.setState({ content: e.target.value })
    if(!document.title.includes('✍')) document.title += ' ✍';
  }

  render() {
    return (
      <div className='index'>
        <Editor content={this.state.content} handleChange={this.handleChange} />
        <Inspector content={this.state.content} />
      </div>
    );
  }


}


export default ReactDOM.render(<Index />, document.getElementById('root'));