import React,{useState,useEffect,useRef} from 'react'
import Navbar from '../components/navbar'
import Charts from '../components/Charts';
import {useLayoutEffect} from 'react';
export default function HeapSort() {
    let arr = [ 94, 56, 77, 8, 72, 30, 67, 4, 52, 2 ]; 
    const [sort,setSort]=useState(false);
    const [sortarr,setSortArr]=useState([...arr]);

    function sleep(ms,array) {
        return new Promise(resolve => setTimeout(resolve, ms)).then(setSortArr([...array]));
      }


    async  function heapsort(arr)
      {
          var N = arr.length;
   
          for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
             await heapify(arr, N, i);
   
          for (var i = N - 1; i > 0; i--) {
              var temp = arr[0];
              arr[0] = arr[i];
              await sleep(1000,arr)
              arr[i] = temp;
              await sleep(1000,arr)
   
             await heapify(arr, i, 0);
          }
      }
   
      
      
   async   function heapify(arr, N, i)
      {
       
          var largest = i; 
          var l = 2 * i + 1; 
          var r = 2 * i + 2; 
   
          if (l < N && arr[l] > arr[largest])
              largest = l;
   
          if (r < N && arr[r] > arr[largest])
              largest = r;
   
          if (largest != i) {
              var swap = arr[i];
              arr[i] = arr[largest];
              await sleep(1000,arr)
              arr[largest] = swap;
              await sleep(1000,arr)
   
            await  heapify(arr, N, largest);
          }
      }

    useEffect(()=>{
        
        heapsort(sortarr,sortarr.length)

    },[sort])


    function handleClick(){
        Promise.resolve().then(()=>{setSortArr([...arr])}).then(()=>{setSort(!sort)})
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
            await heapsort(element,element.length)
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
            <h1 className='p-2'>HEAP SORT</h1>
            <h1 className='p-3'>TIME COMPLEXITY :O(N LOGN)</h1>
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
