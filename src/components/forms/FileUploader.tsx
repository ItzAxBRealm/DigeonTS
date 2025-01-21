import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { fileUpload } from '../../assets'
import { Button } from '../ui/button'
import { convertFileToUrl } from './utils'

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()} className='flex items-center justify-center flex-col bg-zinc-900 rounded-lg cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? (
          <>
            <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
              <img 
                src={fileUrl} 
                alt="image"
                className=' h-80 lg:h-[480px] w-full rounded-[24px] object-cover;'
              />
            </div>
            <p className='text-center w-full p-4'>Click or drag a photo to replace</p>
          </>
        ) : (
          <div className='flex justify-center items-center flex-col p-7 h-80 lg:h-[412px] gap-2'>
            <img src={fileUpload}
            width={96}
            height={77}
            alt="File upload" />
            <h3 className='text-[16px] font-medium leading-[140%] text-purple-1'>Drag photo here</h3>
            <p className='text-purple-1 mb-6 text-[14px] font-normal leading-[140%];'>SVG, PNG, JPG</p>

            <Button type='button' className='py-2 px-4 rounded-lg bg-purple-1'>
              Select from device
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader
