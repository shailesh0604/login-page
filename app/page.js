"use client";
import Lenis from "lenis";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import { Loader } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import Link from "next/link";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const refContainer = useRef(null);

  const userData = [
    {
      image: "/user.jpeg",
      username: "Shailesh",
      userdesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, reiciendis.",
    },
    {
      image: "/user.jpeg",
      username: "Rock",
      userdesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, reiciendis.",
    },
    {
      image: "/user.jpeg",
      username: "Max",
      userdesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, reiciendis.",
    },
    {
      image: "/user.jpeg",
      username: "Paul",
      userdesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, reiciendis.",
    },
    {
      image: "/user.jpeg",
      username: "Ricky",
      userdesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, reiciendis.",
    },
  ];

  const [searchItem, setSearchItem] = useState("");

  const [filteredUsers, setFilteredUsers] = useState(userData);

  const [IsSearch, setIsSearch] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
    const dataValue = e.target.value;
    setSearchItem(dataValue);

    if (dataValue.length > 1) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }

    const filteredItem = userData.filter((user) =>
      user.username.toLowerCase().includes(dataValue.toLowerCase())
    );

    setFilteredUsers(filteredItem);
  };

  const inputRef = useRef(null);

  const clearInput = () => {
    setInputValue("");
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const [search, setSearch] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleOutside = (event) => {
      if (
        refContainer.current &&
        !refContainer.current.contains(event.target)
      ) {
        setSearch(false);
        setIsSearch(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.addEventListener("mousedown", handleOutside);
    };
  }, []);

  return (
    <>
      <div
        className={`input-search-container ${search ? "expand" : ""}  relative`}
        ref={refContainer}
        onClick={() => {
          setSearch(true);
        }}
      >
        <div className="input-search">
          <input
            ref={inputRef}
            value={searchItem}
            onInput={handleInput}
            className="outline-none rounded-full bg-transparent border pl-9 pr-7 h-full"
            placeholder="Find a Creator"
          />
          <div className="absolute top-2/4 left-3.5 w-5 h-5 -translate-y-2/4">
            {inputValue ? (
              <Loader speed="fast" className="text-lg text-white" />
            ) : (
              <FiSearch className="text-lg" />
            )}
          </div>

          <div className="btn-close text-lg" onClick={clearInput}>
            <MdOutlineClose />
          </div>
        </div>

        <div
          className={`search-result-container ${IsSearch ? "searched" : ""}`}
        >
          <div className="flex flex-col gap-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <Link href={`/${user.username}`} key={index}>
                  <div className="user-content">
                    <div className="user-profile">
                      <Image
                        src={user.image}
                        width={0}
                        height={0}
                        sizes="100"
                        alt="profile"
                      />
                    </div>

                    <div className="username-title">
                      <div className="user-name">{user.username}</div>
                      <div className="user-info">{user.userdesc}</div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-users-found">No user found</div>
            )}

            <div className="text-center">
              <Link href={"/"}>See All Result</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
