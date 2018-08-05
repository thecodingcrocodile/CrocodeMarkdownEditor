import React, { Component } from 'react';

export default class Editor extends Component {
  render() {
    return (
      <div className='editor'>
        <textarea onChange={this.props.handleChange} value={this.props.content}></textarea>
      </div>
    );
  }
}
