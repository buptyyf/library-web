import React, {Component} from "react"
import { Link } from "react-router"
import {Navbar, Nav, NavItem} from "react-bootstrap"

export class App extends Component {
    shouldComponentUpdate() {
        console.log("!!!!!!!!!!!!!!!")
        return true
    }
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">React-Bootstrap</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1}><Link to="/">Home</Link></NavItem>
                        <NavItem eventKey={2}><Link to="/about">About</Link></NavItem>
                    </Nav>
                </Navbar>
                <h1 className="col-md-6 col-md-offset-6">yyf React Router Tutorial</h1>
                {this.props.children}
            </div>
        )
    }
}

class Home extends Component {
    componentWillMount() {
        console.log("Home componentWillMount")
    }
    componentDidMount() {
        // let a = setInterval(() => {
        //     this.setState({time: new Date().getSeconds()})
        // }, 1000)
        console.log("Home componentDidMount", console)            
    }
    componentWillUnmount() {
        console.log("Home componentWillUnmount")                        
    }
    componentWillReceiveProps() {
        console.log("Home componentWillReceiveProps")
    }
    componentWillUpdate() {
        console.log("Home componentWillUpdate")
    }
    componentDidUpdate() {
        console.log("Home componentDidUpdate")
    }
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().getSeconds()
        }
    }
    render() {
        return (
        <div>
            <div>{this.props.num}</div>
            <div>{this.state.time}</div>
        </div>
        )
    }
}
const HomeContainer = (Home) => 
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                val: 0
            }
        }
        shouldComponentUpdate() {
            console.log("!!!!!!!!!!!!!!!??????????")
            return true
        }
        componentWillMount() {
            console.log("HomeContainer componentWillMount")
        }
        componentWillReceiveProps() {
            console.log("HomeContainer componentWillReceiveProps")
        }
        componentWillUpdate() {
            console.log("HomeContainer componentWillUpdate")
        }
        componentDidUpdate() {
            console.log("HomeContainer componentDidUpdate")
        }
        componentDidMount() {
            this.setState({val: this.state.val + 1}, ()=>{console.log("callback", this.state)})
            console.log(this.state.val)
            this.setState({val: this.state.val + 1})
            console.log(this.state.val)
            setTimeout(() => {
                console.log(this.state.val)
                
                this.setState({val: this.state.val + 1})
                console.log(this.state.val)
                this.setState({val: this.state.val + 1})
                console.log(this.state.val)                
            }, 1000)
            setTimeout(() => {
                //this.setState({val: this.state.val + 1})
                this.setState({val: this.state.val + 1})
            }, 500)
            console.log("HomeContainer componentDidMount")            
        }
        
        componentWillUnmount() {
            console.log("HomeContainer componentWillUnmount")                        
        }
        render() {
            console.log("render")
            return (<Home num = {this.state.val} {...this.props}/>)
        }
    }

export default HomeContainer(Home)

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