"use strict";

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDIT = 'SELECT_SUBREDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function selectedSubreddit (subreddit) {
	return {
		type: SELECT_SUBREDIT,
		subreddit
	}
}

export function invalidateSubreddit (subreddit) {
	return {
		type: INVALIDATE_SUBREDDIT,
		subreddit
	}
}

export function requestPosts (subreddit) {
	return {
		type: REQUEST_POSTS,
		subreddit
	}
}

function receivePosts (subreddit, json) {
	return {
		type: RECEIVE_POSTS,
		subreddit,
		posts: json.data.children.map(item => item.data),
		receivedAt: Date.now()
	}
}

function fetchPosts (subreddit) {
	return dispatch => {
		dispatch(requestPosts(subreddit));
		return fetch(`https://www.reddit.com/r/${subreddit}.json`)
			.then(response => response.json())
			.then(json => dispatch(requestPosts(subreddit, json)))
	}
}

function shouldFetchPosts (state, subreddit) {
	const posts = state.postsBySubreddit[subreddit];
	if (!posts) {
		return true
	} else if (posts.isFetching) {
		return false
	} else {
		return posts.didInvalidate
	}
}

export function fetchPostsIfNeeded (subreddit) {
	return (dispatch, getState) => {
		if (shouldFetchPosts(getState(), subreddit)) {
			return dispatch(fetchPosts(subreddit))
		}
	}
}