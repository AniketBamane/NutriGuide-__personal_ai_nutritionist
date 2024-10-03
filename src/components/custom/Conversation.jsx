import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {  fetchConversationsFromMongoDb } from '@/queries/fetching';
import Highlight from 'react-highlight'
import Loading from './Loading';
import ScrollToBottom from 'react-scroll-to-bottom';

const Conversation = ({loading}) => {
  const { data, isLoading, error } = useQuery(
    {
      queryKey: ['conversations'],
      queryFn: fetchConversationsFromMongoDb,
    }
  );

  if (isLoading) {
    return <Loading array={[1,1,1,1,1,1]} />;
  }

  if (error) {
    return <div className="text-center">Error fetching conversations: {error.message}</div>;
  }
console.log(data.conversations,"----------------------------")
  return (
    <ScrollToBottom className='h-[65vh]'>

    <div className="w-full max-w-5xl mx-auto p-4">
      {loading && <Loading array={[1]} />}
      {data.conversations?.length == 0 ? (
        <div className="text-center">No conversations found.</div>
      ) : (
        data.conversations?.map((qa) => (
          <div key={qa._id} className="my-4 p-4 border rounded-lg shadow-md">
            {/* Question Section */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-gray-700">You asked:</h3>
              <p className="text-gray-900 font-semibold">{qa.question} ?</p>
            </div>

            {/* Answer Section */}
            <div className="mt-2">
              <h4 className="text-lg font-semibold text-green-600">Bot replied:</h4>
              <div className='overflow-x-auto'>
              <Highlight className="text-gray-800 ">{qa.answer}</Highlight>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
        </ScrollToBottom>
  );
};

export default Conversation;
