import React, { useState,useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {

  const [hide, setHide] = useState(false)

  const size = useWindowSize();


  return (
    <div className='sticky top-0 z-30 block'>
      <nav className="bg-white px-2 sm:px-4  rounded sticky top-0 border-white border-b-2">
        <div className="container flex flex-wrap justify-center items-center mx-auto ">
          
          <button onClick={() => setHide(!hide)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          {hide || size.width > 600 ?

            <div className=" w-full md:block md:w-auto cursor-pointer" id="navbar-default">
              <ul className="flex sm:flex-row flex-col justify-center font-mono py-8">

                <li className="text-black p-5  cursor-pointer">
                  <Link href="/insertionsort">
                    Insertion Sort
                  </Link>
                </li>
                <li className="text-black p-5">
                  <Link href="/bubblesort">
                    Bubble Sort
                  </Link>
                </li>
                <li className="text-black p-5">
                  <Link href="/mergesort">
                    Merge Sort
                  </Link>
                </li>
                <li className="text-black p-5">
              <Link href="/heapsort">
                  Heap Sort
              </Link>

                </li>
                <li className="text-black p-5">
                  <Link href="/quicksort">
                  Quick Sort
                  </Link>
                </li>
                <li className="text-black p-5">
                  <Link href="/radixsort">
                  Radix Sort
                  </Link>
                </li>
                <Link href="/bucketsort">
                  <li className="text-black p-5">
                    Bucket Sort
                  </li>
                </Link>
                <li className="text-black p-5">
                  <Link href="/countingsort">
                  Counting Sort
                  </Link>
                </li>
                  <li className="text-black p-5">
                      <Link href="/q1">
                          7.4-5
                      </Link>
                  </li>
                  <li className="text-black p-5">
                      <Link href="/q2">
                          8.2-4
                      </Link>
                  </li>
                  <li className="text-black p-5">
                      <Link href="/bucketparallel">
                          Parallel Sort
                      </Link>
                  </li>
              </ul>

              </div> : <></>
          }
        </div>
      </nav>
    
    
        </div>

        )
}



        function useWindowSize() {

  const [windowSize, setWindowSize] = useState({
          width: undefined,
        height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
          function handleResize() {

            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
          }

      
      window.addEventListener("resize", handleResize);


        handleResize();

      
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
        return windowSize;
}