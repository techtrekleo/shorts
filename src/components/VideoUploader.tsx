import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { MediaFile } from '../types';

const UploaderContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 2px dashed #e0e0e0;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
  }
`;

const UploadArea = styled.div<{ isDragActive: boolean }>`
  text-align: center;
  padding: 40px 20px;
  background: ${props => props.isDragActive ? '#f0f8ff' : '#fafafa'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f8ff;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
  color: #667eea;
`;

const UploadText = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin: 10px 0;
`;

const FileInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #28a745;
`;

const FileName = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const FileDetails = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;
  
  &:hover {
    background: #c82333;
  }
`;

interface VideoUploaderProps {
  onVideoUpload: (file: MediaFile | null) => void;
  videoFile: MediaFile | null;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoUpload, videoFile }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    if (!file.type.startsWith('video/')) {
      alert('請上傳影片文件！');
      return;
    }

    setIsProcessing(true);
    
    try {
      const url = URL.createObjectURL(file);
      const mediaFile: MediaFile = {
        file,
        url,
        name: file.name,
        size: file.size,
        type: file.type
      };
      
      onVideoUpload(mediaFile);
    } catch (error) {
      console.error('處理影片文件時出錯:', error);
      alert('處理影片文件時出錯');
    } finally {
      setIsProcessing(false);
    }
  }, [onVideoUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm']
    },
    multiple: false
  });

  const removeVideo = () => {
    if (videoFile) {
      URL.revokeObjectURL(videoFile.url);
      onVideoUpload(null);
    }
  };

  return (
    <UploaderContainer>
      <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>🎥 上傳影片</h3>
      
      {!videoFile ? (
        <UploadArea {...getRootProps()} isDragActive={isDragActive}>
          <input {...getInputProps()} />
          <UploadIcon>📹</UploadIcon>
          <UploadText>
            {isDragActive ? '放開以上傳影片' : '拖拽影片到這裡或點擊選擇'}
          </UploadText>
          <UploadText style={{ fontSize: '0.9rem', color: '#999' }}>
            支援 MP4, AVI, MOV, MKV, WebM 格式
          </UploadText>
          {isProcessing && <UploadText>處理中...</UploadText>}
        </UploadArea>
      ) : (
        <FileInfo>
          <FileName>{videoFile.name}</FileName>
          <FileDetails>
            大小: {(videoFile.size / 1024 / 1024).toFixed(2)} MB<br/>
            類型: {videoFile.type}
          </FileDetails>
          <RemoveButton onClick={removeVideo}>
            移除影片
          </RemoveButton>
        </FileInfo>
      )}
    </UploaderContainer>
  );
};

export default VideoUploader;
