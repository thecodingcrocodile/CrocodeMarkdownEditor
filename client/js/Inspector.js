import React, { Component } from 'react';
import marked from 'marked';

export default class Inspector extends Component {
  render() {
    return (
      <div className='inspector'>
        <div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(this.props.content)}}></div>
      </div>
    );
  }
}
