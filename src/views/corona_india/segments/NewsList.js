import React , {Suspense} from 'react';
import Axios from 'axios';
const NewsCard = React.lazy( () => import('./NewsCard'));

export default class NewsList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    componentDidMount()
    {
        Axios.get('https://visuospace.herokuapp.com/news')
        .then(response => {
            this.setState({news : response.data});
        });
    }
    RenderWhenNotNullNews = (flag) => {
        if(!flag) return null;
        let st = this.props.currentTheme ? 0 : 1;
        if(flag) return(
            <Suspense fallback={<div></div>}>
            <div className='default_scroll'>
            {
                this.state.news.articles.map((e,i) => {
                    let desc = this.state.news.articles[i].description;
                    if((desc != null && desc.length != 0) && i < 10)
                    {
                        if(this.state.news.articles[i].author == null)
                            this.state.news.articles[i].author = 'Collected';
                        return <div key={i}><NewsCard theme={st} data={this.state.news.articles[i]}/></div>;
                    }
                })
            }
            </div>
            </Suspense>
        );
    }
    render(){
        return (
            <>
            {this.RenderWhenNotNullNews(this.state.news)}
            </>
        );
    }
}