import React, { useState, useEffect,useLayoutEffect,useRef } from 'react'
import Navbar from '../components/navbar'
import Charts from '../components/Charts';

export default function Q2() {

    const [find, setFind] = useState(false);

    const [findUnique, setFindUnique] = useState([]);

    const [count,setCount] = useState(0);




    const beginRef=useRef()
    const endRef=useRef()

    let newArr = [];
    let funcFilter = function(arr, a, b) {
        for(let i = 0; i< arr.length; i++) {
            if(arr[i] >= a && arr[i] <= b ) {
                if(newArr.indexOf(arr[i]) == -1)
                    newArr.push(arr[i]);
            }
        }
        return newArr;
    }

    const [fileSort, setFileSort] = useState(false);

    function handleClick(){
        setFileSort(!fileSort)
    }


//Filing
    const [matrix,setMatrix]=useState([[]])

    function sleepforfilearray(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        async function sortFiles(){

            for (let index = 0; index < matrix.length; index++) {
                let element=matrix[index]
                let arrray=funcFilter(element,beginRef.current.value,endRef.current.value);
                console.log(arrray)
                setFindUnique(arrray)
                await sleepforfilearray(1000)


                if((index+1)!==matrix.length)
                {
                    alert("move to next line?")

                }


            }
        }
        sortFiles();

    }, [fileSort])



    function showFile(e) {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload =  async (e) => {
            const text = (e.target.result)
            console.log(text)
            //  alert(text)
            const arrayformaipulation=convertFileToArrays(text)
            // for (let index = 0; index < arrayformaipulation.length; index++) {

            //     console.log(arrayformaipulation[0])
            //    await bubblesort(arrayformaipulation[0])
            //    await sleepforfilearray(1000)
            setMatrix(arrayformaipulation)
            // }
        };
        reader.readAsText(e.target.files[0])


    }
    function convertFileToArrays(text){

        let twodArray = text.split("\n").map(function(e) {return e.split(",").map(Number)

        });
        console.log(twodArray)


        return twodArray;



    }
    return (


        <div>
            <Navbar/>
            <div className='flex flex-col sm:flex-row items-center justify-around pt-5 text-center font-mono font-bold '>
                <h1 className='p-2'>Find Unique</h1>
                <h1 className='p-3'>TIME COMPLEXITY :O(N^2)</h1>
                <input type="file" onChange={showFile} />
                <label for={"beginRange"}>Starting Range</label>
                <input className="border-solid border-2 border-black" type="number" name={"beginRange"} ref={beginRef}/>
                <label htmlFor={"endRange"}>Ending Range</label>
                <input type="number" className='border-solid border-2 border-black' name="endRange" ref={endRef}/>


                <button className='bg-black p-5 rounded-full text-white my-5 w-36 dark:border-white dark:border-2' onClick={handleClick}>
                    FIND

                </button>
            </div>
            <h1>
                <div className='flex sm:flex-row flex-col justify-center text-center w-full'>
                    {findUnique.map((item,index)=>

                        <div className='p-5 m-5 border border-spacing-4 border-orange-600 rounded-full' key={index}>
                            {item}
                        </div>
                    )}
                </div>
            </h1>



        </div>
    )
}
