import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

// copy to Clipboard and range how much to be copied password length 
const passwordRef = useRef(null)
  
  //memoisation using usecallback
  //optimze it when method is run
  //changes in code is saved in cache 
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*_+-{}[]`~";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);//concatinate  the password
    }

    setPassword(pass);
  }, [length, numbAllowed, charAllowed, setPassword]);
//cannot give password dependency as it will run in an infinite loop and reruns again



const copyPasswordToClip = useCallback(()=>{
        passwordRef.current?.select()
        //to select range of password selected to copy
        passwordRef.current?.setSelectionRange(0,20);
        window.navigator.clipboard.writeText(password)

},[password])

  useEffect(()=>{
      passwordGenerator()
  },[length,numbAllowed,charAllowed,passwordGenerator]);




  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-3 my-8 text-orange-400 bg-gray-600">
        <h1 className="text-white text-center my-7 text-xl">
        Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-10">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          ></input>
          <button  onClick={copyPasswordToClip}
          className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput"> Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
