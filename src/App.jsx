import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState(null)
  const passwordRef = useRef(null)
  const [copyText,setCopyText] = useState('copy')

  const passwordGenerator = useCallback(() => {
    setCopyText('copy')
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if (numberAllowed){str += "0123456789"}
    if(charAllowed){str+="@#$_"}
    for (let index = 0; index < length; index++) {
     const char = Math.floor(Math.random()*str.length)
     pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length,numberAllowed,charAllowed])

  const copyPasswordToClip = useCallback(() => {
    setCopyText("copied")
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-xl mx-auto shadow-md rounded-lg p-4 mt-8 text-gray-800 bg-gray-700'>
        <h1 className='text-3xl mb-2 text-center text-white'>Password generator</h1>
        <div className='flex shadow rounded-lg'>
           <input className='m-1 w-full rounded-lg rounded-r-none pl-2' type="text" value={password} ref={passwordRef}/>
           <button className='bg-blue-700 p-1.5 text-lg text-white rounded-lg rounded-l-none' onClick={copyPasswordToClip}>{copyText}</button>
        </div>
        <div className='flex text-sm gap-x2'>
          <div className='flex items-center gap-x-1 m-1 text-white'>
            <input type="range" min={8} max={25} value={length} className='cursor-pointer' onChange={(event)=>setLength(event.target.value)}/>
            <label className='pr-2'>Length: {length}</label>
            <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>setNumberAllowed(!numberAllowed)}/>
            <label className='pr-2'>Number</label>
            <input type="checkbox" defaultChecked={charAllowed} onChange={()=>setCharAllowed(!charAllowed)}/>
            <label >Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
