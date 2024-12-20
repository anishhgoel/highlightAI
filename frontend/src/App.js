import React, { useState, useEffect } from 'react';

const App = () => {
  const [selectedText, setSelectedText] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Function to handle text selection
  const handleTextSelect = () => {
    const selected = window.getSelection().toString();
    if (selected.length > 0) {
      setSelectedText(selected);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  // Detect text selection anywhere on the page
  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelect);
    return () => {
      document.removeEventListener('mouseup', handleTextSelect);
    };
  }, []);

  // Fetch response (analogy, explanation, example) from the backend
  const fetchResponse = async (type) => {
    const response = await fetch(`http://localhost:5025/response?text=${selectedText}&type=${type}`);
    const data = await response.json();
    setDialogContent(data.response);
    setShowDialog(true);
    setShowOptions(false);  // Hide options after selection
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Highlight any text to get an analogy, explanation, or example.</h3>

      {showOptions && (
        <div style={{ border: '1px solid black', padding: '10px', backgroundColor: '#f0f0f0', position: 'absolute', top: '100px', left: '100px' }}>
          <button onClick={() => fetchResponse('analogy')}>Analogy</button>
          <button onClick={() => fetchResponse('explanation')}>Explanation</button>
          <button onClick={() => fetchResponse('example')}>Example</button>
        </div>
      )}

      {showDialog && (
        <div style={{ border: '1px solid black', padding: '10px', backgroundColor: '#f9f9f9', position: 'absolute', top: '200px', left: '100px' }}>
          <p>{dialogContent}</p>
          <button onClick={() => setShowDialog(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default App;
