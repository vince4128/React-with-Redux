import React, { Component } from 'react';

import YTSearch from 'youtube-api-search';

import SearchBar from './search_bar';
import VideoList from './video_list';

//api key
const API_KEY = 'AIzaSyD4UktRSzQVmt_yYtEDAM6ePRIMgCvX4Kg';

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
        <VideoList videos={this.state.videos}/>
      </div>
    );
  }
}

export default App;
