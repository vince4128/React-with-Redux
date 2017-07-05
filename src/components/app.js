import React, { Component } from 'react';

import SearchBar from './search_bar';

class App extends Component {

  constructor(props){
    super(props);

    this.state = { videos: [] };

    //exemple search
    YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
      this.setState({ videos });
      //this.setState({ videos: videos }); es6 condence ({ videos })
    });

  }

  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

export default App;
