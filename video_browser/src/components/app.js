import _ from 'lodash';

import React, { Component } from 'react';

import YTSearch from 'youtube-api-search';

import SearchBar from './search_bar';
import VideoList from './video_list';
import VideoDetail from './video_detail';

//api key
const API_KEY = 'AIzaSyD4UktRSzQVmt_yYtEDAM6ePRIMgCvX4Kg';

class App extends Component {

  constructor(props){
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term){
    //exemple search
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos:videos,
        selectedVideo: videos[0]
      });
      //this.setState({ videos: videos }); es6 condence ({ videos })
    });
  }

  render() {

    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}//update app states
        videos={this.state.videos}/>
      </div>
    );
  }
}

export default App;
