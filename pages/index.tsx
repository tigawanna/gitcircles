import type { NextPage } from 'next'
import { useContext } from 'react';
import { ProfileInfo } from '../components/people/ProfileInfo';
import GlobalContext from '../utils/context/GlobalsContext';
import ViewerContext from './../utils/context/ViewerContext';
import { GrHome } from "react-icons/gr";
import { TheIcon } from './../components/Shared/TheIcon';

const Home: NextPage = (props:any) => {
const viewerCtx = useContext(ViewerContext)

// console.log("global ctx   ===  ",viewerCtx)

  return (
    <div className="min-h-screen h-full flex flex-col justify-between">
      <div className="h-[20%]">
      <ProfileInfo
        token={viewerCtx?.value?.token as string}
        user={viewerCtx?.value?.viewer}
      />
      </div>


    </div>
  );
}

export default Home
