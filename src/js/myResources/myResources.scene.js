class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

export class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    //this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This section is bad style and causes a bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: this.state.words.concat(['yyf'])});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
