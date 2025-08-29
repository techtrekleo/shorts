import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MediaFile, VideoSettings, AudioSettings, ShortsConfig } from '../types';

const EditorContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-top: 20px;
`;

const EditorTitle = styled.h2`
  color: #333;
  margin: 0 0 25px 0;
  text-align: center;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsSection = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid #667eea;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin: 0 0 15px 0;
  font-size: 1.2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Range = styled.input`
  flex: 1;
`;

const RangeValue = styled.span`
  min-width: 50px;
  text-align: right;
  color: #666;
`;

const PreviewSection = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const PreviewTitle = styled.h3`
  color: #333;
  margin: 0 0 15px 0;
`;

const PreviewInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const InfoItem = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const InfoLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
`;

const InfoValue = styled.div`
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background: ${props => props.variant === 'primary' ? '#667eea' : '#6c757d'};
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

interface ShortsEditorProps {
  videoFile: MediaFile | null;
  audioFile: MediaFile | null;
}

const ShortsEditor: React.FC<ShortsEditorProps> = ({ videoFile, audioFile }) => {
  const [videoSettings, setVideoSettings] = useState<VideoSettings>({
    loopCount: 3,
    startTime: 0,
    endTime: 6
  });

  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    startTime: 0,
    endTime: 60,
    volume: 1,
    fadeIn: 0,
    fadeOut: 0
  });

  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);

  const updateVideoSettings = (field: keyof VideoSettings, value: number) => {
    setVideoSettings(prev => ({ ...prev, [field]: value }));
  };

  const updateAudioSettings = (field: keyof AudioSettings, value: number) => {
    setAudioSettings(prev => ({ ...prev, [field]: value }));
  };

  const calculateOutputDuration = () => {
    const videoDuration = (videoSettings.endTime - videoSettings.startTime) * videoSettings.loopCount;
    const audioDuration = audioSettings.endTime - audioSettings.startTime;
    return Math.max(videoDuration, audioDuration);
  };

  const handleGenerate = async () => {
    if (!videoFile || !audioFile) {
      alert('請先上傳影片和音樂！');
      return;
    }

    setIsProcessing(true);
    
    try {
      // 這裡會實現實際的影片處理邏輯
      console.log('開始生成 Shorts...', {
        videoSettings,
        audioSettings,
        quality,
        outputDuration: calculateOutputDuration()
      });
      
      // 模擬處理時間
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Shorts 生成完成！');
    } catch (error) {
      console.error('生成 Shorts 時出錯:', error);
      alert('生成 Shorts 時出錯');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePreview = () => {
    if (!videoFile || !audioFile) {
      alert('請先上傳影片和音樂！');
      return;
    }
    
    // 這裡會實現預覽功能
    console.log('預覽 Shorts...');
  };

  return (
    <EditorContainer>
      <EditorTitle>🎬 Shorts 編輯器</EditorTitle>
      
      <PreviewSection>
        <PreviewTitle>📊 預覽資訊</PreviewTitle>
        <PreviewInfo>
          <InfoItem>
            <InfoLabel>影片循環次數</InfoLabel>
            <InfoValue>{videoSettings.loopCount} 次</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>影片片段長度</InfoLabel>
            <InfoValue>{(videoSettings.endTime - videoSettings.startTime).toFixed(1)} 秒</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>音樂使用片段</InfoLabel>
            <InfoValue>{(audioSettings.endTime - audioSettings.startTime).toFixed(1)} 秒</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>輸出總長度</InfoLabel>
            <InfoValue>{calculateOutputDuration().toFixed(1)} 秒</InfoValue>
          </InfoItem>
        </PreviewInfo>
      </PreviewSection>

      <SettingsGrid>
        <SettingsSection>
          <SectionTitle>🎥 影片設定</SectionTitle>
          
          <FormGroup>
            <Label>循環次數</Label>
            <Input
              type="number"
              min="1"
              max="20"
              value={videoSettings.loopCount}
              onChange={(e) => updateVideoSettings('loopCount', parseInt(e.target.value) || 1)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>開始時間 (秒)</Label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={videoSettings.startTime}
              onChange={(e) => updateVideoSettings('startTime', parseFloat(e.target.value) || 0)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>結束時間 (秒)</Label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={videoSettings.endTime}
              onChange={(e) => updateVideoSettings('endTime', parseFloat(e.target.value) || 6)}
            />
          </FormGroup>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>🎵 音樂設定</SectionTitle>
          
          <FormGroup>
            <Label>開始時間 (秒)</Label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={audioSettings.startTime}
              onChange={(e) => updateAudioSettings('startTime', parseFloat(e.target.value) || 0)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>結束時間 (秒)</Label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={audioSettings.endTime}
              onChange={(e) => updateAudioSettings('endTime', parseFloat(e.target.value) || 60)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>音量</Label>
            <RangeContainer>
              <Range
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={audioSettings.volume}
                onChange={(e) => updateAudioSettings('volume', parseFloat(e.target.value))}
              />
              <RangeValue>{audioSettings.volume.toFixed(1)}</RangeValue>
            </RangeContainer>
          </FormGroup>
          
          <FormGroup>
            <Label>淡入時間 (秒)</Label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={audioSettings.fadeIn}
              onChange={(e) => updateAudioSettings('fadeIn', parseFloat(e.target.value) || 0)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>淡出時間 (秒)</Label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={audioSettings.fadeOut}
              onChange={(e) => updateAudioSettings('fadeOut', parseFloat(e.target.value) || 0)}
            />
          </FormGroup>
        </SettingsSection>
      </SettingsGrid>

      <FormGroup>
        <Label>輸出品質</Label>
        <Select value={quality} onChange={(e) => setQuality(e.target.value as any)}>
          <option value="low">低品質 (快速)</option>
          <option value="medium">中品質 (平衡)</option>
          <option value="high">高品質 (慢速)</option>
        </Select>
      </FormGroup>

      <ActionButtons>
        <Button onClick={handlePreview} disabled={!videoFile || !audioFile}>
          👁️ 預覽
        </Button>
        <Button 
          variant="primary" 
          onClick={handleGenerate} 
          disabled={!videoFile || !audioFile || isProcessing}
        >
          {isProcessing ? '🔄 處理中...' : '🚀 生成 Shorts'}
        </Button>
      </ActionButtons>
    </EditorContainer>
  );
};

export default ShortsEditor;
