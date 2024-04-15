import { useState } from "react";
import searchUsers from "../../../../api/user/searchUsers";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/userSlice";

const SearchSection = ({ list, setList }) => {
  const userSelector = useSelector(selectUser);

  const [inputArray, setInputArray] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value !== "") {
      searchUsers(e.target.value).then((response) => {
        console.log(response);
        if (!response) {
          setInputArray([]);
        } else {
          setInputArray(response);
        }
      });
    } else {
      setInputArray([]);
    }
  };

  const addToList = (data) => {
    setList((current) => [...current, data]);
  };
  return (
    <div className="w-full md:w-1/2 p-3">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered border-primary w-full mb-2"
        onChange={(e) => handleChange(e)}
      />
      <ul>
        {inputArray.map((data, index) => {
          let idExist = list.some(
            (element) => element.user_id === data?.user_id
          );

          if (data?.user_id === userSelector?.id) {
            return;
          }

          if (!idExist) {
            return (
              <li
                key={index}
                className="bg bg-neutral_white w-full h-[4rem] rounded-xl flex items-center justify-between px-4 mb-2"
              >
                <div className="flex items-center">
                  <div className="avatar mr-2">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                    </div>
                  </div>
                  <p className="text-neutral_dark">{data?.username}</p>
                </div>
                <button
                  onClick={() => addToList(data)}
                  className="btn text-neutral_white hover:scale-105"
                >
                  add
                </button>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
export default SearchSection;
