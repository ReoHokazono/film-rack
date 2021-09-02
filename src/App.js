import React, { Component} from "react";
import YouTube from "react-youtube";
import "./App.css";
import LazyImage from "./LazyImage";


const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

function VideoBox(props) {
    const videoId = props.videoId;
    if (videoId != "") {
        return <YouTube videoId={videoId} className="VideoBox"  />
    } else {
        return <div></div>
    }
}

class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://storageaccountfilmr8bb1.blob.core.windows.net/public-movielist/now-playing.json")
            .then(res => res.json())
            .then(
                (res) => {
                    const items = res.result;
                    shuffleArray(res.result);
                    this.setState({
                        isLoaded: true,
                        items: items
                    });
                },
                (err) => {
                    this.setState({
                        isLoaded: true,
                        error: err
                    });
                }
            );
    }

    render(){
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul className="List">
                    <li key="firstpage" className="ListItem">
                        <div className="ListItemInner"  id="Firstpage">
                            <h1>えいがさがし（β版<span id="title-adjust"> </span>）</h1>
                            <h2>ポスターを見て、<div>ピンとくる映画をさがそう!</div></h2>
                            <div className="SwipeGuide">&lt;--- スワイプして映画をさがす  &lt;---</div>
                            <div>配信サービス向けのコンテンツも開発予定です。</div>
                            <div>お問い合わせ: <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/hkzn_fy">Twitter @hkzn_fy</a></div>
                        </div>
                    </li>
                    {items.map(item => (
                        <li 
                            key={item.movieId} 
                            className="ListItem" 
                        >
                            <div className="ListItemInner">
                                <LazyImage src={item.posterUrl} alt={item.title + " ポスター"} />
                                <div className="ItemTitle">{item.title}</div>
                                <div className="ItemOverview">{item.overview}</div>
                                <a 
                                    href={item.homepage} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="ItemLink"
                                >
                                    <div>公式サイト</div>
                                </a>
                                <div className="ItemDate">公開: {item.releaseDate}</div>
                                <VideoBox videoId={item.videoId}/>
                            </div>
                        </li>
                    ))}
                    <li key="lastpage" className="ListItem">
                        <div className="ListItemInner" id="Lastpage">
                            <div id="Thx">最後までご覧いただきありがとうございます。</div>
                            <div>えいがさがし（β版）は2021年9月から開発中です。みなさまのご意見、ご感想をお待ちしています。</div>
                            <div>お問い合わせ: <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/hkzn_fy">Twitter @hkzn_fy</a></div>
                            <div>ソースコード: <a target="_blank" rel="noopener noreferrer" href="https://github.com/ReoHokazono/film-rack">GitHub</a></div>

                            <div>コンテンツ提供: <a target="_blank" rel="noopener noreferrer" href="https://www.themoviedb.org/">TMDb</a> このサービスではTMDB APIを使用していますが、TMDbと当サービスは無関係です。</div>
                            <div className="Tmdblogo">
                                <LazyImage src="./tmdb.svg" alt="TMDb logo" />
                            </div>
                        </div>
                    </li>
                </ul>
            );
        }
    }
}

export default App;