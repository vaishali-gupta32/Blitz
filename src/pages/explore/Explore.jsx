import React, { useEffect, useState } from 'react';
import { db, collection, getDocs, updateDoc, doc, arrayUnion, increment } from './firebase';
import { FaHeart, FaComment } from 'react-icons/fa';
import './explore.css';

const App = () => {
  const [stories, setStories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      const storiesCollection = collection(db, 'stories');
      const storiesSnapshot = await getDocs(storiesCollection);
      const storiesList = storiesSnapshot.docs.map(doc => ({
        id: doc.id,
        image: doc.data().image,
        name: doc.data().Name
      }));
      setStories(storiesList);
    };

    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, showComments: false }));
      setPosts(postsList);
    };

    fetchStories();
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likes: increment(1)
    });

    // Update local state to reflect the new like count
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        } else {
          return post;
        }
      });
    });
  };

  const handleToggleComments = (postId) => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, showComments: !post.showComments };
        } else {
          return post;
        }
      });
    });
  };

  const handleAddComment = async (postId, newComment) => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      comments: arrayUnion(newComment)
    });

    // Fetch updated posts after comment addition to reflect changes
    const updatedPostsCollection = collection(db, 'posts');
    const updatedPostsSnapshot = await getDocs(updatedPostsCollection);
    const updatedPostsList = updatedPostsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setPosts(updatedPostsList);
  };

  const handleFollow = async (userId) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      followers: arrayUnion('currentUserId')  // Replace 'currentUserId' with the actual user ID
    });
  };

  return (
    <div className="app">
      <div className="stories">
        {stories.map((story, index) => (
          <div key={index} className="story">
            <img src={story.image} alt={story.name} />
          </div>
        ))}
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <span className="username">{post.user}</span>
              <span className="time">{post.time}</span>
              <span className="following">FOLLOWING</span>
            </div>
            <img src={post.img} alt="post" className="post-img" />
            <div className="post-footer">
              <div className="actions">
                <button onClick={() => handleLike(post.id)}><FaHeart /></button>
                <button onClick={() => handleToggleComments(post.id)}><FaComment /></button>
              </div>
              <p>
                {post.text}
                <br />
                {post.hashtags}
              </p>
              <div>
                {post.likes} Likes
              </div>
              {post.showComments && (
                <div>
                  Comments:
                  <ul>
                    {post.comments && post.comments.map((comment, idx) => (
                      <li key={idx}>{comment}</li>
                    ))}
                  </ul>
                  <form className="comment-form" onSubmit={(e) => {
  e.preventDefault();
  const newComment = e.target.elements.comment.value;
  handleAddComment(post.id, newComment);
  e.target.reset();
}}>
  <input className="comment-input" type="text" name="comment" placeholder="Add a comment" />
  <button className="comment-button" type="submit">Post</button>
</form>

                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

