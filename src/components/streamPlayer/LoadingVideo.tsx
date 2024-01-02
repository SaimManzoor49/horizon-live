import { Loader } from 'lucide-react'

interface LoadingVideoProps{
    label:string
}

const LoadingVideo = ({label}:LoadingVideoProps) => {
  return (
    <div className='h-full flex flex-col space-y-4 justify-center items-center'>
<Loader  className=' animate-spin h-10 w-10 text-muted-foreground'/>
<p className='text-muted-foreground'>
    <span className='capitalize' >{label}</span>
</p>
    </div>
  )
}

export default LoadingVideo