import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import { Search } from "./components/Search";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifUrlList: []
    };
  }

  renderImageList(list) {
    const imageList = list.map(url => {
      return (
        <li className="item" key={url.id}>
          <img src={url} className="image" />
        </li>
      );
    });

    return <ul className="list">{imageList}</ul>;
  }

  componentDidMount() {
    this.giphyApi();
  }

  render() {
    console.log(this.state.gifUrlList);
    return (
      <div className="body">
        <Search search={this.giphyApi} />
        {this.renderImageList(this.state.gifUrlList)}
      </div>
    );
  }

  giphyApi = target => {
    const search = target;
    const key = "V6AU97qCSCYVmbIC5UDppEiVM1xnuO9E";
    const limit = 10;

    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    axios.get(url).then(res => {
      console.log(res.data);
      const data = res.data.data;
      const imageUrlList = data.map(item => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });
    });
  };
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
