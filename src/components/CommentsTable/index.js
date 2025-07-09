import './index.css'

const CommentsTable = (props) => {
    const { comments } = props

    return (
        <div className="table-container">
            <table className="comments-table">
                <thead className='thead'>
                    <tr>
                        <th>Post ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment.id}>
                            <td>{comment.postId}</td>
                            <td>{comment.name}</td>
                            <td>{comment.email}</td>
                            <td>{comment.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CommentsTable