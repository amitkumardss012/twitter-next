
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { UserSugg } from '@/components/home/UserSugg';
import { userType } from '@/type';
import Link from 'next/link';
import PopUpContent from '@/components/home/MobileNav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LuMoveLeft } from 'react-icons/lu'
import { useRouter } from 'next/navigation';


interface ApiResponse {
  message: string;
  user: userType[];
  logedInUserID: number;
}

const Search = () => {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  // Function to debounce API requests
  const debouncedFetchData = useCallback(
    (func: Function, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return (...args: any) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    },
    []
  );

  // Function to fetch data from the API
  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(`http://localhost:3000/api/explore?query=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData: ApiResponse = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced function to fetch data
  const debouncedFetchDataCallback = useCallback(debouncedFetchData(fetchData, 1000), [debouncedFetchData]);

  useEffect(() => {
    if (query) {
      debouncedFetchDataCallback();
    } else {
      setData(null);
    }
  }, [query, debouncedFetchDataCallback]);

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-black/10">
        <Sheet>
          <SheetTrigger className='md:hidden'>
            <img
              src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"
              alt=""
              className="w-9 h-9 rounded-full"
            />
          </SheetTrigger>
          <SheetContent side="left">
            <PopUpContent />
          </SheetContent>
        </Sheet>

        <LuMoveLeft className='text-2xl hidden md:block cursor-pointer font-bold' onClick={() => router.back()} />

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex bg-gray-300 gap-3 rounded-full items-center pl-3 h-8">
            <IoIosSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-r-full h-full bg-gray-300 outline-blue-500"
            />
          </div>
        </form>

        <IoSettingsOutline className="font-bold text-2xl" />
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      {data && data.user.length === 0 ? (
        <p className='text-3xl p-4 text-red-600 font-bold'>No user found</p>
      ) : (
        data && (
          <div>
            <ul>
              {data.user.map((user) => (
                <UserSugg user={user} key={user.id} />
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default Search;
