import React, { useState,useContext } from "react";
import dayjs from "dayjs";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail} from "react-icons/ai";
import { TbPoint, TbBrandTwitter } from "react-icons/tb";
import {MdCorporateFare} from 'react-icons/md'
import Image from "next/image";
import { Viewer } from './../../utils/types/usertypes';
import GlobalContext from "../../utils/context/GlobalsContext";

import relativeTime from 'dayjs/plugin/relativeTime'
import { TheIcon } from './../Shared/TheIcon';
dayjs.extend(relativeTime)
interface ProfileInfoProps {
  user: Viewer | undefined;
  token: string;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, token}) => {
  const globalCtx = useContext(GlobalContext)
  const ogUser = globalCtx?.value?.mainuser
  const extradetails = {company:user?.company,email:user?.email,
    location:user?.location,twitter:user?.twitterUsername}

  const [yes, setYes] = useState<any>(user?.isFollowingViewer);
  const [active, setActive] = useState<string>("");
  const username = user?.login as string;
  const admin = user?.isViewer
  //console.log("og user",admin)
  const followThem = (their_name: string, token: string) => {
    setYes(true);
    // followUser(their_name, token);
  };
  const unfollowThem = (their_name: string, token: string) => {
    setYes(false);
    // unfollowUser(their_name, token);
  };
 
  console.log("main user === ",user)
  return (
    <div className="h-full w-full dark-styles">
      <div className="w-full   p-2 flex-col-center ">
        <div className="p-1 h-full w-full flex flex-col md:flex-row items-center">
          <div
            className="h-[40%] md:h-[30%] max-w-[200px] 
            max-h-[200px] w-[70%] md:w-[15%] rounded-[5%] 
              shadow  shadow-slate-400">
            <Image
              className="
             h-[100%] w-[100%] rounded-[5%]  m-1"
              src={user?.avatarUrl as string}
              alt=""
              height={"40px"}
              width={"40px"}
              layout="responsive"
              priority
            />
          </div>

          <div
            className="text-[15px]  flex flex-col md:flex-row  items-center md:justify-evenly
         shadow-md shadow-slate-600 dark:shadow-slate-600  p-3  m-2 w-full 
           font-sans  h-full 
      "
          >
            <div className="text-[15px] w-full ">
              <div className=" text-[15px] md:text-xl font-bold  ">
                {user?.login}
              </div>
              <div className="text-[15px] md:text-lg ">@{user?.login}</div>
              <div className="text-[15px] max-w-[80%]">{user?.bio}</div>
              <div className="text-[15px]">
                Joined {" :"} {dayjs(user?.createdAt).fromNow()}
              </div>
            </div>

            <div className="text-[15px] w-full ">
              <ProfileInfoItemWrapper valkey="email" value={extradetails?.email}/>
              <ProfileInfoItemWrapper valkey={"company"} value={extradetails?.company}/>
              <ProfileInfoItemWrapper valkey="location" value={extradetails?.location}/>
              <ProfileInfoItemWrapper valkey={'twitter'} value={extradetails?.twitter}/>
            </div>
          </div>
        </div>

        <div className="w-[70%] flex justify-between">
          <div
            onClick={() => {
              setActive("followers");
            }}
            className="text-[12px] md:text-lg w-fit h-fit hover:bg-slate-500 rounded.sm 
            hover:text-white cursor-pointer p-[2px]   dark:hover:bg-slate-900"
            style={{
              borderBottomColor: "purple",
              borderStyle: active === "followers" ? "solid" : "none",
              borderBottomWidth: "5px",
            }}
          >
            folllowers: {user?.followers?.totalCount}
          </div>
          {!admin ? (
            <div>
              {yes ? (
                <button
                  onClick={() => unfollowThem(username, token)}
                  className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 
                  text-[12px] rounded-md p-[4px] m-[3px] h-fit"
                >
                  {"Unfollow"}
                </button>
              ) : (
                <button
                  onClick={() => followThem(username, token)}
                  className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 
                  text-[12px] rounded-md p-[4px] m-[3px] h-fit "
                >
                  {"Follow"}
                </button>
              )}
            </div>
          ) : null}
          <div
            onClick={() => {
              setActive("following");
            }}
            className="text-[12px] md:text-lg w-fit h-fit rounded-sm 
          hover:bg-slate-500 hover:text-white cursor-pointer p-[2px] dark:hover:bg-slate-900"
            style={{
              borderBottomColor: "purple",
              borderStyle: active === "following" ? "solid" : "none",
              borderBottomWidth: "5px",
            }}
          >
            folllowing: {user?.following?.totalCount}
          </div>
        </div>
      </div>
    </div>
  );
};



interface ProfileInfoItemWrapperProps {
value?:string
valkey:string
}

export const ProfileInfoItemWrapper: React.FC<ProfileInfoItemWrapperProps> = ({
  valkey,
  value
}) => {
  console.log("kyett",valkey,value)
  if (!value) {
    return null;
  }
  
  const WhatIcon = () => {
    console.log("kye",valkey,value)
    switch (valkey) {

      case "company":
        return MdCorporateFare;
      case "email":
        return AiOutlineMail;
      case "twitter":
        return TbBrandTwitter;
      case "location":
        return IoLocationOutline;
      default:
        return TbPoint;
    }
  };

  return (
    <div className="flex items-center">
      <TheIcon Icon={WhatIcon()} color={""} size={""} />
      <div className="text-[15px] ">{value}</div>
    </div>
  );
};
