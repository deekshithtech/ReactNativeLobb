import React, { useState } from 'react';
import HomeScreen from './Components/HomeScreen';
import Screen2 from './Components/ScreenFirst';

export default function App() {
  const [selectedContent, setSelectedContent] = useState(null);

  const handleNavigate = (content) => {
    setSelectedContent(content);
  };

  const handleBack = () => {
    setSelectedContent(null);
  };

  return selectedContent ? (
    <Screen2 content={selectedContent} onBack={handleBack} />
  ) : (
    <HomeScreen onNavigate={handleNavigate} />
  );
}
