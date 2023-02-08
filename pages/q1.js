import React, { useState, useEffect,useRef } from 'react'
import Navbar from '../components/navbar'
import Charts from '../components/Charts';
import {useLayoutEffect} from 'react';import { sleep } from '../utils/functions';

export default function Q1() {
    const updatedState={}
    let arr = [5,3,7,6,2,9];
    const [sort, setSort] = useState(false);
    const [sortarr, setSortArr] = useState([...arr]);

    function sleep(ms,array) {
        return new Promise(resolve => setTimeout(resolve, ms)).then(setSortArr([...array]));
    }


   //Quick sort and Insertion Sort hybrid algo

   async function insertion_sort(arr,low,n){
        for(let i=low+1;i<n+1;i++)
        {
            let val=arr[i];
            let j=i;
            while (j>low&&arr[j-1]>val)
            {
                arr[j]=arr[j-1];
                await sleep(100,arr)
                j-=1;
            }
            arr[j]=val;
            await sleep(100,arr)

        }

    }

  async function partition(arr,low,high)
    {
        let pivot=arr[high]
        let i=low;
        let j=low;
        for(let i=low;i<high;i++)
        {
            if(arr[i]<pivot)
            {
                let temp=arr[i];
                arr[i]=arr[j];
                await sleep(100,arr)

                arr[j]=temp;
                await sleep(100,arr)

                j+=1;
            }
        }
        let temp=arr[j];
        arr[j]=arr[high];
        await sleep(100,arr)
        arr[high]=temp;
        await sleep(100,arr)

        return j;


    }


    async function quickandinsert(arr,low,high){
        while(low<high){
            if(high-low+1<10)
            {
                await insertion_sort(arr, low, high);
                break;
            }
            else
            {
                let pivot=partition(arr,low,high);

                if(pivot-low<high-pivot)
                {
                    await quickandinsert(arr, low, pivot - 1);
                    low=pivot+1;
                }
                else
                {
                    await quickandinsert(arr, pivot + 1, high);
                    high=pivot-1;
                }
            }
        }
        return arr;

    }




    useEffect(() => {



        async function update(){
            let arrray=await quickandinsert(arr,0,arr.length-1)
            console.log(arrray+"Inside the useEffect Hook")
            await sleep(100,arrray)
        }
        update().then(()=>console.log("updated state"))
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
                await quickandinsert(element,0,element.length-1)
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
                <h1 className='p-2'>QUICK SORT</h1>
                <h1 className='p-3'>TIME COMPLEXITY :O(N^2)</h1>
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
