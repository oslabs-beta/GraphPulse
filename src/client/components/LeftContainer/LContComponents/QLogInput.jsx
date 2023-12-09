import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import React from "react";


function QLogInput() {
  const [queryString, setQueryString] = useState('');

  const { data } = useQuery(gql`{queryString}`);

  
  useEffect(() => {
    console.log(data);
  }, [queryString])

  const handleSubmit = () => {
    e.preventDefault();
  };

    return (
        <div>
          <form>
            <textarea 
            className="query-input" 
            type="text" 
            name="Query" 
            placeholder="Query Input"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
            ></textarea>
            <button type="submit" value="Submit">Send Query</button> 
          </form>
        </div>
    );

}

export default QLogInput;