import React, { useState } from "react";
import { Search } from "lucide-react";
import CommunityPrompts from "../community-prompts";
import { useForm } from "react-hook-form";
import SearchResults from "../search-results";

const Explorer = () => {
  const { register, handleSubmit , reset} = useForm();
  const [ tag , setTag ] = useState()


  const onSubmit = async (data) => {
     const value = data?.tag    
     setTag(value.trim())
  };

  const handleKeyDown = (e) => {
    e.key === "Enter" && handleSubmit(onSubmit)();
  };
  return (
    <div className=" h-full flex flex-col  px-4 gap-5 w-full ">
      <div className="w-full max-w-4xl mt-4 mx-auto  overflow-hidden rounded-xl border bg-background shadow-sm flex items-center gap-3 hover:border-ring hover:ring-ring/50 hover:ring-[3px] transition-all duration-200 ">
        <input
          type="tag"
          name="tag"
          placeholder="Search by tags (eg: 'plot' , 'mystery')"
          className="w-full p-3 outline-none rounded-xl text-sm"
          {...register("tag", { required: "this is required" })}
          onKeyDown={handleKeyDown}
        />
        <Search
          className="mr-2 cursor-pointer"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
      
      {/* {errors.tag && <small>{errors.tag.message} </small>} */}
      <SearchResults tag={tag} reset={reset}/>
      <CommunityPrompts />
    </div>
  );
};

export default Explorer;
