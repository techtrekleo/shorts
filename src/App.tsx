import React, { useState } from 'react';
import styled from 'styled-components';
import VideoUploader from './components/VideoUploader';
import AudioUploader from './components/AudioUploader';
import ShortsEditor from './components/ShortsEditor';
import { MediaFile } from './types';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 10px 0 0 0;
  opacity: 0.9;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`;

const UploadSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

function App() {
  const [videoFile, setVideoFile] = useState<MediaFile | null>(null);
  const [audioFile, setAudioFile] = useState<MediaFile | null>(null);

  return (
    <AppContainer>
      <Header>
        <Title>🎬 Shorts 製作中心</Title>
        <Subtitle>上傳影片與音樂，製作完美的 Shorts 內容</Subtitle>
      </Header>
      
      <MainContent>
        <UploadSection>
          <VideoUploader 
            onVideoUpload={setVideoFile}
            videoFile={videoFile}
          />
          <AudioUploader 
            onAudioUpload={setAudioFile}
            audioFile={audioFile}
          />
        </UploadSection>
        
        {(videoFile || audioFile) && (
          <ShortsEditor 
            videoFile={videoFile}
            audioFile={audioFile}
          />
        )}
      </MainContent>
    </AppContainer>
  );
}

export default App;
