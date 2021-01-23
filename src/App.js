import logo from './logo.svg';
import './App.css';
import React from 'react';


/* 
	const testData = [
			{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
      {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  		{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
	];
 */

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile}></Card>)}
  </div>
)

class Card extends React.Component{
    render(){
      const profile = this.props;

      return (
        <div className="github-profile">
          <img src={profile.avatar_url} alt="profile"/>
          <div className="info">
            <div className="name">{profile.name}</div>
            <div className="company">{profile.company}</div>
          </div>
    	  </div>
      );
    }
}

class Form extends React.Component{ 
  state = { userName: ''};
  handleSubmit = async (event) => { 
    event.preventDefault();

    const response = await fetch(`https://api.github.com/users/${this.state.userName}`);
    const profile = await response.json();
    this.props.onSubmit(profile);
    this.setState({ userName: '' });
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="Add a GitHub User Name" 
          required
        />
        <button>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component{
    /* constructor(props){
      super(props);
      this.state = {
        profiles: testData,
      };
    } */

    state = {
      profiles: [],
    }

    addNewProfile = (profileData) => {
      this.setState(prevState => ({
        profiles: [...prevState.profiles, profileData],
      }));
    }

    render(){
      return(
        <div>
          <div className="header" >{this.props.title}</div>
          <Form onSubmit={this.addNewProfile}></Form>
          <CardList profiles={this.state.profiles}></CardList>
        </div>
      );
    }

}

export default App;
