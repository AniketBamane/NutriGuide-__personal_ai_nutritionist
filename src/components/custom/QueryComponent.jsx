import React, { useState } from 'react';
import { Input } from '@/components/ui/input';  // Assuming you're using Shadcn UI Input
import { Button } from '@/components/ui/button'; // Shadcn UI Button
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { storeResponseInFirebase, uploadQuestion } from '@/queries/fetching';
import { LeafyGreen, Loader2 } from 'lucide-react';
import TypewriterEffect from './TypewriterEffect';

const QueryComponent = ({loading,setLoading}) => {
  const [query, setQuery] = useState('');  // State for storing input
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading ,error,isError } = useMutation({
    mutationFn:uploadQuestion,
    onSuccess: async(response) => {
      try{
        console.log(response,"-----------response----------")
       await storeResponseInFirebase(query,response)
        queryClient.invalidateQueries(['conversations']); 
      }catch(err){
        console.error(err);
      }finally{
        setQuery("")
        setLoading(false)
      }
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleInputChange = (e) => {
    setQuery(e.target.value);  
  };

  const handleSubmit = async() => {
    if (query.trim()) {
      console.log(query)
      setLoading(true);
      await mutateAsync(query)
    }
  };
  console.log(error,isLoading,"------------------------")
  return (
    <div className="w-full max-w-5xl mx-auto p-4 sticky top-0 bg-white">
      <div className="mb-4">
        <label htmlFor="query" className="block text-lg font-medium text-green-900 mb-2">
        <LeafyGreen className="inline" fill='green' />  NutriGuide  <LeafyGreen className="inline" fill='green' />
        </label>
        <TypewriterEffect />
        {isError && <h2>{error.message}</h2>}
        <Input
          id="query"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter your query here"
          className="w-full px-4 py-2 border rounded-md"
          disabled={loading}
        />
      </div>
      <Button className="bg-green-600 text-white" onClick={handleSubmit} disabled={isLoading}>
      {loading && <Loader2 className='w-4 h-4 animate-spin' /> }  Submit
      </Button>
    </div>
  );
};

export default QueryComponent;
