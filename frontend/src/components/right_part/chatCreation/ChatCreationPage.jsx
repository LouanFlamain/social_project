import { useEffect, useState } from "react";
import SearchSection from "./left/SearchSection";
import Section from "./left/Section";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { changeMobile, selectMobile } from "../../../redux/mobileSlice";
import { FaArrowLeft } from "react-icons/fa";

const ChatCreationPage = () => {
  const userInfo = useSelector(selectUser);
  const [list, setList] = useState([]);
  let [title, setTitle] = useState("Démarrer une conversation");
  const dispatch = useDispatch();

  const mobileData = useSelector(selectMobile);
  const [mobileClass, setMobileClass] = useState("right-panel-mobile-out");
  useEffect(() => {
    if (mobileData) {
      setMobileClass("right-panel-mobile-in");
    } else {
      setMobileClass("right-panel-mobile-out");
    }
  }, [mobileData]);

  const handleClickMobile = () => {
    dispatch(changeMobile(false));
  };
  return (
    <div
      className={`fixed md:static w-full h-full md:pl-5 ${mobileClass} ease-linear duration-150`}
    >
      <div className="p-3 bg-neutral_dark md:bg-neutral_dark/80 h-full md:rounded-2xl flex flex-col">
        <div className="flex items-center">
          <FaArrowLeft
            onClick={handleClickMobile}
            className="scale-150 mx-3 text-neutral_white md:hidden"
          />
          <h2 className="text-center text-3xl text-neutral_white">{title}</h2>
        </div>
        <div className="flex h-full md:flex-row flex-col">
          <SearchSection list={list} setList={setList} />
          <Section list={list} setList={setList} userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};
export default ChatCreationPage;
