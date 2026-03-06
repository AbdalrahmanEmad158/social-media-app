    import { Alert } from 'flowbite-react'
import React from 'react'
    
    export default function AppAlert(props)
     {
        const{color , content} = props
      return (
        <div>
           <Alert className='my-3' color={color}>
       {content}
    </Alert>
        </div>
      )
    }
    