'use client';
import React, { useState, useEffect } from 'react';
import { FileText, Mic, Languages, Book, BrainCircuit, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Panel() {
  
  const [mainContent, setMainContent] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/getContent')
    .then((response) => response.json())
    .then((data) => {
      setMainContent(data);
      console.log(data);
    });
  },[]);

  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen for messages from the content script
    window.addEventListener('message', async (event) => {
      if (event.data.type === 'CONTENT_RESPONSE') {
        try {
          console.log('Content received:', event.data.content); // Log the content received

          // Ensure the content is not empty
          if (!event.data.content) {
            console.error('No content received');
            setError('No content received');
            return;
          }

          console.log("Sending content to API:", event.data.content); // Log the content before sending

          // Sending content to the API
          const response = await fetch('http://localhost:8000/api/v1/news/summarize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: mainContent.contentData }),  // Send the content in the request body
          });

          // Handling the API response
          const data = await response.json();
          if (data.summary) {
            setSummary(data.summary);  // Set the summary if available
          } else {
            setError('Failed to generate summary');
          }

          setIsLoading(false);  // Stop loading after receiving the response
        } catch (err) {
          console.error('Error while fetching summary:', err);
          setError('Failed to generate summary');
          setIsLoading(false);
        }
      }
    });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('message', () => {});
    };
  }, []);

  // Handle button click to start summarization
  const handleSummaryClick = async () => {
    setIsLoading(true);
    setError(null);
    
    setSummary(null);

    // Send message to parent window (content script) to get page content
    window.parent.postMessage({ type: 'GET_PAGE_CONTENT' }, '*');
  };

  const handleSummary = async () => {
    // console.log(mainContent.contentData);
    setIsLoading(true);
    const response = await fetch('http://localhost:8000/api/v1/news/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: mainContent.contentData }),  // Send the content in the request body
    });
    
    setError(null);
    
    setSummary(null);

    const data = await response.json();
    console.log(data.data);  // Log the response text
    //const text = data.data.candidates[0].content.parts[0].text;   // Resolve the promise
    setIsLoading(false);
    setSummary(data.data)
  }
  
  const handleQuestions = async () => {
    // console.log(mainContent.contentData);
    setIsLoading(true);
    const response = await fetch('http://localhost:8000/api/v1/news/generateQuiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: mainContent.contentData }),  // Send the content in the request body
    });
    
    // setError(null);
    
    // setSummary(null);

    const data = await response.json();
    console.log(data);  // Log the response text
    //const text = data.data.candidates[0].content.parts[0].text;   // Resolve the promise
    
  }
  
  const playAudioSummary = () => {
    
            
    let encodedText = encodeURIComponent(summary);
    let url = `https://api.voicerss.org/?key=e1922b5566c04f5f92c204fab34f4bba&hl=en-us&src=${encodedText}&c=MP3`;

    let audio = new Audio(url);
    
    audio.play();
    }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 overflow-auto">
        <div className="p-6 pb-24">
          <h1 className="mb-5 text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Welcome <span role="img" aria-label="waving hand">👋</span>
          </h1>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Tools</h2>
              <Button variant="ghost" className="text-blue-500 hover:text-blue-600 font-medium">
                More <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <ToolButton
                icon={<FileText />}
                label="Summary"
                onClick={handleSummary}
                disabled={isLoading}
              />
              <ToolButton icon={<Mic />} label="Audio Summary" onClick={playAudioSummary}/>
              <ToolButton icon={<Languages />} label="Language" />
              <ToolButton icon={<BrainCircuit />} label="Content Analysis" />
              <ToolButton icon={<Book />} onClick={handleQuestions} label="Quiz Generation" />
            </div>
          </div>

          {/* Summary Results Section */}
          {(isLoading || summary || error) && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>

              {isLoading && (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-[85%]" />
                </div>
              )}

              {error && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                  {error}
                </div>
              )}

              {summary  && !isLoading && (
                <div className="p-4 bg-accent/50 rounded-lg">
                  <p className="whitespace-pre-wrap">{summary}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToolButton({ icon, label, onClick, disabled }) {
  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center h-24 gap-2 hover:bg-accent/50 hover:text-blue-500 transition-colors group border-border/50 p-4 text-center"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="group-hover:text-blue-500 transition-colors">
        {icon}
      </div>
      <span className="text-sm truncate">{label}</span>
    </Button>
  );
}