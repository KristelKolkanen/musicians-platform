import React, { useState } from 'react';

const CommentSection = ({ onAddComment, currentTime }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentObj = {
        time: currentTime,
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      onAddComment(newCommentObj);
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      <div>
        <h3>Lisa kommentaar</h3>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Sisesta kommentaar..."
        />
        <button onClick={handleAddComment}>Lisa</button>
      </div>

      <ul>
        {/* Kommentaaride kuvamine */}
        {comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.time} :</strong> {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
