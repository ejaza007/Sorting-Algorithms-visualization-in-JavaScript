import React, { useState, useEffect,useRef } from 'react'
import Navbar from '../components/navbar'
import Charts from '../components/Charts';
import {useLayoutEffect} from 'react';import { sleep } from '../utils/functions';

export default function Radixsort() {
    const updatedState={}
    let arr = [94, 56, 77, 8, 72, 30, 67, 4, 52, 2];
    const [sort, setSort] = useState(false);
    const [sortarr, setSortArr] = useState([...arr]);

    function sleep(ms,array) {
        return new Promise(resolve => setTimeout(resolve, ms)).then(setSortArr([...array]));
    }




function getMax(arr,n)
{
    let mx = arr[0];
        for (let i = 1; i < n; i++)
            if (arr[i] > mx)
                mx = arr[i];
        return mx;
}
 

async function countSort(arr,n,exp)
{
    let output = new Array(n); 
        let i;
        let count = new Array(10);
        for(let i=0;i<10;i++)
            count[i]=0;
  
        for (i = 0; i < n; i++)
            count[Math.floor(arr[i] / exp) % 10]++;
  
      
        for (i = 1; i < 10; i++)
            count[i] += count[i - 1];
  
        for (i = n - 1; i >= 0; i--) {
            output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
            count[Math.floor(arr[i] / exp) % 10]--;
        }
  
   
        for (i = 0; i < n; i++)
            arr[i] = output[i];
            await sleep(1000,arr)

}
 

    
function radixsort(arr,n)
{

        let m = getMax(arr, n);
  
      
        for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10)
            countSort(arr, n, exp);
}


useEffect(() => {
    radixsort(arr,arr.length)
    console.log(arr+"Inside the useEffect Hook")

}, [sort])

function handleClick(){
  //  Promise.resolve().then(()=>{setSortArr([...arr])}).then(()=>{setSort(!sort)})
    setSort(!sort)
}

//Filing
const [fileSort, setFileSort] = useState(false);
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
            await radixsort(element, element.length)
            await sleepforfilearray(1000)
            console.log(element+"Inside the useEffect Hook")
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
        setFileSort(!fileSort)
            
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
                <h1 className='p-2'>RADIX SORT</h1>
                <h1 className='p-3'>TIME COMPLEXITY :O(NK)</h1>
                <input type="file" onChange={showFile} />


                <button className='bg-black p-5 rounded-full text-white my-5 w-36 dark:border-white dark:border-2' onClick={handleClick}>
                    SORT

                </button>
            </div>
   <h1>
       <div className='flex sm:flex-row flex-col justify-center text-center w-full'>
    {sortarr.map((item,index)=>

        <div className='p-5 m-5 border border-spacing-4 border-orange-600 rounded-full' key={index}>
            {item}
        </div>
    )}
    </div>
   </h1>
 

   <Charts array={sortarr}/>
   
</div>
)
}
