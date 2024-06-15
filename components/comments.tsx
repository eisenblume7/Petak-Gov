import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { FC } from 'react';

interface CommentsProps {
    projectId: number;
}

const Comments: FC<CommentsProps> = ({ projectId }) => {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comments?projectId=${projectId}`);
                setComments(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [projectId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading comments: {error.message}</div>;

    return (
        <div className='mt-8'>
            <h2 className='text-2xl font-bold text-black'>Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className='mb-4 p-2'>
                        <div className='flex items-center mb-2'>
                            <div className='text-blue-500 font-bold mr-2'>
                                {comment.author?.name}
                            </div>
                            <div className='text-gray-500'>
                                {format(new Date(comment.createdAt), 'MMMM d, yyyy')}
                            </div>
                        </div>
                        <p>{comment.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
