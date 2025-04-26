/*import React, { useEffect, useState } from 'react';

const PaymentChatbot = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="dialogflow-console"]')) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    
    script.onload = () => {
      // Small delay to ensure the custom element is registered
      setTimeout(() => setIsScriptLoaded(true), 100);
    };
    
    script.onerror = () => {
      setError('Failed to load Dialogflow script');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ 
      height: '90vh', 
      width: '100%', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {isScriptLoaded && (
        <df-messenger
          intent="WELCOME"
          chat-title="LavendraPayBot"
          agent-id="lavendrapaybot-vdlt"
          language-code="en"
        ></df-messenger>
      )}
    </div>
    
  );
};

export default PaymentChatbot;
*/

