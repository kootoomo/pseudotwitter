import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-pannel';
import PostStatusFilter from '../post-status-filter/';
import PostList from '../post-list';
import PostAddForm from '../post-add-form/';

// import './app.css';
// import style from './App.module.css';
import styled from 'styled-components';

import logo from './logo.png';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`

// const StyledAppBlock = styled(AppBlock)`
//     background-color:grey;
// `

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label: 'Going to learn React', important: true, like: false, id: 1},
                {label: 'Sounds good', important: false, like: false, id: 2},
                {label: 'Lets go sleep...', important: false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            //CREATE NEW ARRAY, DON'T CHANGE OLD ARRAY
            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [...before, ...after];

            return {
                data: newArr
            }
            
            //(CHANGE OLD ARRAY) WRONG WAY - MAKES CHANGES IN STATE DIRECTLY
            // data.splice(index, 1);
            // return {
            //     data: data
            // }

        });
    }

    addItem(body) {
        // console.log(body);
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data:newArr
            }
        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data:newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter( (item) => {
            return item.label.indexOf(term) > -1
        });
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items;
        }
    }
    
    onUpdateSearch(term) {
        this.setState({term})
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;

        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            // <StyledAppBlock>
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />                
                </div>
                <PostList 
                    posts={visiblePosts} 
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm
                    onAdd={this.addItem}
                />
                <img src={logo} className="App-logo mt-3 mx-auto d-block" alt="logo" />
            </AppBlock>
            // </StyledAppBlock>
        )
    }
}
