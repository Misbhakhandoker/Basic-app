import Image from "next/image";

function SingleBlog() {
  return (
    <div className="w-[680px] bg-slate-100 p-5 rounded-md mt-5">
      <div className="flex gap-1 items-center">
        <div className="w-10 h-10 rounded-full bg-red-400 overflow-hidden">
          <Image
            width={100}
            height={100}
            className="object-cover w-full"
            src="https://images.unsplash.com/photo-1735896951413-cb764374f75a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile-image"
          />
        </div>
        <span className="self-end text-[12px] text-gray-400 tracking-tight font-bold">
          @mijbahkhandker
        </span>
      </div>
      <div className="mt-5 w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-4xl mb-5">This is a title</h1>
        <img
          src="https://images.unsplash.com/photo-1735896951413-cb764374f75a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-96 object-cover rounded-sm"
        />
        <p className="mt-5 text-[16px]">this is content</p>
      </div>
    </div>
  );
}

export default SingleBlog;
